# Vue 父子通信的方式

## 安装依赖

```
npm install
```

### 启动项目

```
npm run serve
```

---

### 通信方式：

```
> props（常用）
> props和$emit（常用）
> .sync（语法糖）
> model（单选框和复选框场景可以使用）
> $attr和$listeners（组件封装用的比较多）
> provide和inject（高阶组件/组件库使用比较多）
> eventBus（小项目中使用就好）
> Vuex（中大型项目推荐使用）
> $parent和$children（推荐少用）
> $root（组件树的根，用的少）
> 其他通信方式
```

#### 一、props

> 当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

在使用 prop 传参时需要注意：

- vue 的设计理念是单向数据流，不建议在子组件直接更改父级的数据。
- 未在父组件 data 中声明的对象属性，子组件无法获取更新内容。
- 数组的变化和更新，取决于 vue 重写数组方法是否有实现数据监听功能。vue 有两种观察数组的方法：变异方法（push、pop、shift、unshift、splice、sort、reverse）和非变异方法（filter、concat、slice），变异方法可以修改原数组，非变异方法不可以修改原数组，但是非变异方法可以用新数组替换旧数组来实现数据的重新渲染。

```javascript
    // Father组件
    <template>
      <div class="father">
        <Child
          :msg='msg'
          :changeMsg='handleChangeMsg'
          />
      </div>
    </template>

    <script>
    import Child from './Child.vue'

    export default {
        name: 'father',
        data() {
            return {
                msg: 'msg'
            }
        },
        methods: {
            handleChangeMsg(value) {
                this.msg = value
            }
        },
        components: {
            Child
        }
    }
    </script>
```

```javascript
    // Child组件
    <template>
      <div class="child">
        <h3>String使用：</h3>
        <div>
          {{msg}}
        </div>
        <button @click="handleChangeMsg">修改父组件的msg</button>
      </div>
    </template>

    <script>
    export default {
      name: 'Child',
      props: {
        msg: {
          type: String,
          default: ''
        },
        changeMsg: {
          type: Function,
          default: () => {}
        }
      },
      methods: {
          handleChangeMsg() {
            // this.msg = 'a' // 控制台会报错

            // 可以使用父组件给的方法来改数据
            this.changeMsg('hello world')
          }
      }
    }
    </script>
```

#### 二、props 和\$emit

> 触发当前实例上的事件。附加参数都会传给监听器回调。

emit 的使用场景主要是在子组件要传参数给父组件，通过\$emit 来触发父组件给的监听器。

```javascript
    // Father组件
    <template>
      <div class="father">
        {{value}}
        <Child v-on:change="handleChange" :value='value' />
      </div>
    </template>

    <script>
    import Child from './Child.vue'

    export default {
        name: 'father',
        data() {
            return {
                value: ''
            }
        },
        methods: {
            handleChange(value) {
              this.value = value
            }
        },
        components: {
            Child
        }
    }
    </script>
```

```javascript
    // Child组件
    <template>
        <div class="child">
            <input type="text" :value="value" @change="_change">
        </div>
    </template>

    <script>
    export default {
        name: 'Child',
        props: {
            value: String
        },
        methods: {
            _change(e) {
                this.$emit('change', e.target.value)
            }
        }
    }
    </script>
```

#### 三、.sync 语法糖（2.3.0+ 新增）

> 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源。因此以 update:myPropName 的模式触发事件取而代之。

- 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model。
- 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。
- 当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用`<Child :value.sync='value' v-bind.sync='obj' />`，这样会把 obj 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。

```javascript
    // Father组件
    <template>
      <div class="father">
        {{value}}
        <br/>
        {{obj}}
        <br/>
        <!-- <Child v-on:update:value='value = $event' /> -->
        <!-- sync是上面的语法糖 -->
        <!-- <Child :value.sync='value' /> -->
        <Child :value.sync='value' v-bind.sync='obj' />
      </div>
    </template>

    <script>
    import Child from './Child.vue'

    export default {
        name: 'father',
        data() {
            return {
                value: 'hello',
                obj: {
                  title: '主题',
                  content: '文本'
                }
            }
        },
        components: {
            Child
        }
    }
    </script>
```

```javascript
    // Child组件
    <template>
        <div class="child">
            <input type="text" :value="value" @change="_change">
            <br/>
            <button @click="_changeObj">改变obj对象</button>
        </div>
    </template>

    <script>
    export default {
        name: 'Child',
        props: {
            value: String
        },
        methods: {
            _change(e) {
                this.$emit('update:value', e.target.value)
            },
            _changeObj() {
                this.$emit('update:title', '新主题')
            }
        }
    }
    </script>
```

#### 四、model（2.2.0 新增）

> 允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

```javascript
    // Father组件
    <template>
      <div class="father">
        输入的值是：{{phoneInfo}}
        <Child v-model="phoneInfo" />
      </div>
    </template>

    <script>
    import Child from './Child.vue'

    export default {
      name: 'father',
      data() {
        return {
          phoneInfo: {
            areaCode: '+86',
            phone: ''
          }
        }
      },
      components: {
        Child
      }
    }
    </script>

```

```javascript
    // Child组件
    <template>
        <div class="child">
            <select
                :value="phoneInfo.areaCode"
                placeholder="区号"
                @change="_changeAreaCode"
                >
                <option value="+86">+86</option>
                <option value="+60">+60</option>
            </select>
            <input
                :value="phoneInfo.phone"
                type="number"
                placeholder="手机号"
                @input="_changePhone"
            />
        </div>
    </template>

    <script>
    export default {
        name: 'Child',
        model: {
            prop: 'phoneInfo', // 默认 value
            event: 'change' // 默认 input
        },
        props: {
            phoneInfo: Object
        },
        methods: {
            _changeAreaCode(e) {
                this.$emit('change', {
                    ...this.phoneInfo,
                    areaCode: e.target.value
                })
            },
            _changePhone(e) {
                this.$emit('change', {
                    ...this.phoneInfo,
                    phone: e.target.value
                })
            }
        }
    }
    </script>
```

#### 五、\$attrs 和\$listeners (2.4.0 新增)

> 1.  \$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="\$attrs" 传入内部组件——在创建高级别的组件时非常有用。
> 2.  \$listeners 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="\$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

- inheritAttrs 也是 2.4.0 新增，默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。当撰写包裹一个目标元素或另一个组件的组件时，这可能不会总是符合预期行为。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过 实例属性 \$attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。

```javascript
    // 第一个组件
    <template>
      <div class="one">
        第一个组件的value：{{value}}
        <Two :value='value' @change="handleChange" @changeTwo.native='handleChange' :test='test' />
      </div>
    </template>

    <script>
    import Two from './Two.vue'

    export default {
        name: 'one',
        data() {
            return {
                value: 10,
                test: 'hello'
            }
        },
        methods: {
            handleChange(value, msg) {
              this.value = value
              console.log(msg)
            }
        },
        components: {
            Two
        }
    }
    </script>
```

```javascript
    // 第二个组件
    <template>
        <div class="two">
            <button @click="_change">第二个组件</button>
            <br/>
            第二个组件的value：{{$attrs.value}}
            <Three v-bind="$attrs" v-on="$listeners"/>
        </div>
    </template>

    <script>
    import Three from './Three.vue'

    export default {
        inheritAttrs: false, //
        name: 'two',
        props: {
            test: String
        },
        created() {
            console.log('-----第二个组件-----')
            console.log(this.$attrs) // 获取父级作用域中绑定在该组件上且没有在Prop声明的属性
            // {value: 10}
            console.log(this.$listeners) // 获取父作用域中的 (不含 .native 修饰器的) v-on 事件监听器
            // {change: ƒ}
        },
        methods: {
            _change() {
                this.$emit('change', 2, '来自第二个组件的事件触发')
            }
        },
        components: {
            Three
        }
    }
    </script>
```

```javascript
    // 第三个组件
    <template>
      <div class="three">
          <button @click="_change">第三个组件</button>
          <br/>
          第三个组件中显示第一个组件的value：{{$attrs.value}}
      </div>
    </template>

    <script>
    export default {
        name: 'three',
        created() {
            console.log('-----第三个组件-----')
            console.log(this.$attrs)
            console.log(this.$listeners)
        },
        methods: {
            _change() {
                this.$emit('change', 3, '来自第三个组件的事件触发，感谢$listeners')
            }
        }
    }
    </script>
```

#### 六、provide / inject（2.2.0 新增）

<!--##### 类型：-->
<!--1. provide：Object | () => Object-->
<!--2. inject：Array<string> | { [key: string]: string | Symbol | Object }-->

> 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

- provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中
- provide 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。
- inject 选项应该是一个字符串数组，或一个对象，对象的 key 是本地的绑定名。value 是在可用的注入内容中搜索用的 key (字符串或 Symbol)，或一个对象。该对象的：from 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)，default 属性是降级情况下使用的 value。
- provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

```javascript
    // one组件
    <template>
      <div class="one">
        data中的b:{{b}}
        <br>
        可响应对象test:{{test}}
        <br>
        <button @click="_change">第一个组件的按钮</button>
        <Two/>
      </div>
    </template>

    <script>
    import Vue from "vue"
    import Two from './Two.vue'
    import symbol from './symbol'

    export default {
      // provide: {
      //   a: 'A'
      // },
      provide () {
        this.test = Vue.observable({ // 可响应对象的创建，建议传响应式对象
          count: 0
        })
        return {
          a: 'A',
          test: this.test, // 赋与对象指针
          b: this.b, // 赋值操作
          [symbol.KEY]: 'C',
          one: this,
          onChange: this.handleChange
        }
      },
      name: 'one',
      data () {
        return {
          b: 'B'
        }
      },
      created () {
        console.log('-----第一个组件-----')
        console.log('data中b=' + this.b)
      },
      methods: {
        handleChange (value, msg) {
          this.b = value
          console.log(msg)
        },
        _change () {
          this.b = 'one....b'
          this.test.count++
        }
      },
      components: {
        Two
      }
    }
    </script>
```

```javascript
    // two组件
    <template>
      <div class="two">
        inject中b的值：{{b}}
        <br>
        inject中test的值：{{test}}
        <br>
        <button @click="onChange">第二个组件的按钮</button>
        <Three/>
      </div>
    </template>

    <script>
    import Three from './Three.vue'
    import symbol from './symbol'

    export default {
      //   inject: ['a', 'b'],
      inject: {
        a: {
          default: 'AA'   // 在 2.5.0+ 的注入可以通过设置默认值使其变成可选项
        },
        b: {
          from: 'b',  // 如果它需要从一个不同名字的属性注入，则使用 from 来表示其源属性
          default: 'no value！'
        },
        key: {
          from: symbol.KEY,
          default: () => ['no', 'value'] // 与 prop 的默认值类似，你需要对非原始值使用一个工厂方法
        },
        one: {
          default: () => ({})
        },
        _change: { // 命名与子组件冲突可以更改别名
          from: 'onChange'
        },
        test: {
          from: 'test'
        }
      },
      name: 'two',
      props: {
        two_p_b: {
          default () {
            return this.b
          }
        }
      },
      data () {
        return {
          two_d_b: this.b
        }
      },
      created () {
        console.log('-----第二个组件-----')
        console.log('inject注入的a=' + this.a)
        console.log('inject注入的b=' + this.b)
        console.log('-------------------')
        console.log('inject注入整个one组件')
        console.log(this.one)
        console.log('-------------------')
        console.log('props中b=' + this.two_p_b)
        console.log('data中b=' + this.two_d_b)
        console.log(`inject注入的Symbol类型的key=${JSON.stringify(this.key)}`)
      },
      methods: {
        onChange () {
          if (this.one && this.one.handleChange) {
            // this._change('two', '来自第二个组件的触发')

            this.test.count++ // 因为test指向的是个响应式对象，所以可以这么使用
            this.one.b = 'two.....b'

            // this.one.handleChange('two', '来自第二个组件的触发')
          }
        }
      },
      components: {
        Three
      }
    }
    </script>
```

```javascript
    // three组件
    <template>
      <div class="three">
        inject中b的值：{{b}}
        <br>
        计算属性中获取b的值：{{getB}}
        <br>
        inject中test的值：{{test}}
        <br>
        计算属性中获取test的值：{{getTest}}
        <br>
        <button @click="_change">第三个组件的按钮</button>
      </div>
    </template>

    <script>
    export default {
      name: 'three',
      inject: ['onChange', 'one', 'test', 'b'], // 其余和two组件中的使用基本一致，这里不一一列举了
      created () {
        console.log('-----第三个组件-----')
        console.log('inject注入整个one组件')
        console.log(this.one)
      },
      computed: {
        getTest () {
          return this.test
        },
        getB () {
          return this.b
        }
      },
      methods: {
        _change () {
          if (this.one && this.one.handleChange) {
            this.onChange('three.....b', '来自第三个组件的触发')
            this.test.count++
            // this.one.handleChange('three', '来自第三个组件的触发')
          }
        }
      }
    }
    </script>
```

```javascript
// symbol.js文件的内容
const KEY = Symbol();

export default {
  KEY
};
```

#### 七、\$parent

> 指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 this.\$parent 访问父实例，子实例被推入父实例的 \$children 数组中。

- 节制地使用 \$parent 和 \$children - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信。

```javascript
    // Father组件
    <template>
      <div id="father">
        <Child/>
      </div>
    </template>

    <script>
    import Child from './Child.vue'

    export default {
      name: 'father',
      data () {
        return {
          msg: 'hello'
        }
      },
      created () {
        this.$nextTick(() => {
          console.log(this.$children)
        })
      },
      components: {
        Child
      }
    }
    </script>
```

```javascript
    // Child组件
    <template>
      <div class="child">
        父组件的值：{{$parent.msg}}
        <br>
        <input type="text" @change="change">
      </div>
    </template>

    <script>
    export default {
      name: 'Child',
      created () {
        console.log(this.$parent)
      },
      methods: {
        change(e) {
          this.$parent.msg = e.target.value
        }
      }
    }
    </script>
```

#### 八、EventBus

> 声明一个全局 Vue 实例变量 EventBus , 把所有的通信数据，事件监听都存储到这个变量上。这样就达到在组件间数据共享了，有点类似于 Vuex。

- 这种方式只适用于极小的项目，复杂项目还是推荐 Vuex。
- 不仅可以在父子组件通信，兄弟组件也可以实现通信。

```javascript
    // Father组件
    <template>
      <div class="father">
        <h3>父组件Father</h3>
        父组件监听子组件Child的传值：{{value}}
        <br>
        <Child/>
        <br>
        <child-b/>
      </div>
    </template>

    <script>
    import Child from './Child.vue'
    import ChildB from './ChildB.vue'
    import eventBus from './bus.js'

    export default {
      name: 'father',
      data () {
        return {
          value: ''
        }
      },
      created() {
        // 事件监听
        eventBus.$on('change', (value) => {
          this.value = value
        })
      },
      components: {
        Child, ChildB
      }
    }
    </script>
```

```javascript
    // Child组件
    <template>
      <div class="child">
        <h3>子组件Child</h3>
        子组件监听兄弟组件ChildB的传值：{{value}}
        <br>
        子组件Child的输入框：<input type="text" @change="_change">
      </div>
    </template>

    <script>
    import eventBus from './bus.js'

    export default {
      name: 'Child',
      data () {
        return {
          value: ''
        }
      },
      created () {
        // 事件监听
        eventBus.$on('changeB', (value) => {
          this.value = value
        })
      },
      methods: {
        _change (e) {
          eventBus.$emit('change', e.target.value)
        }
      }
    }
    </script>
```

```javascript
    // ChildB组件
    <template>
      <div class="childB">
        <h3>子组件ChildB</h3>子组件ChildB的输入框：
        <input type="text" @change="_change">
      </div>
    </template>

    <script>
    import eventBus from './bus.js'

    export default {
      name: 'ChildB',
      methods: {
        _change (e) {
          eventBus.$emit('changeB', e.target.value)
        }
      }
    }
    </script>
```

#### 九、\$root

> 当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

- 通过访问根组件也能进行数据之间的交互，但极小情况下会直接修改父组件中的数据。

#### 十、Vuex

> 官方推荐的，Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

- 推荐使用在全局状态管理多的情况使用（中大型项目）。
- 例如路由访问控制、用户信息存储、权限树、检测登录状态等场景使用 Vuex 更好。

#### 十一、broadcast 和 dispatch

> vue1.0 中提供了这种方式，但 vue2.0 中没有，但很多开源软件都自己封装了这种方式，比如 min-ui、element-ui 和 iview 等。

- broadcast 是寻找指定子辈组件，然后触发事件，可理解为广播。
- dispatch 是寻找指定的祖辈组件，然后触发事件，可理解为调度。
- 一般都作为一个 mixins 去使用, 本质上这种方式还是 on 和 emit 的封装，但在一些基础组件中却很实用。

```javascript
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    // 遍历子组件
    var name = child.$options.name; // 获取子组件的组件名

    if (name === componentName) {
      // 判断是不是要派发的子组件
      child.$emit.apply(child, [eventName].concat(params)); // 调用子组件的派发方法
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params])); // 否则this交给子组件，寻找孙子组件中是否存在
    }
  });
}
export default {
  methods: {
    // 调度
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; // 获取父组件
      var name = parent.$options.name; /// 获取父组件的组件名

      while (parent && (!name || name !== componentName)) {
        // 判断父组件是否存在 && （父组件名是否为空 || 父组件名不等于要派发的组件名）
        parent = parent.$parent; // 获取父组件的父组件

        if (parent) {
          // 如果父组件的父组件存在
          name = parent.$options.name; // 获取父组件的父组件的组件名
        }
      }
      // 结束循环
      if (parent) {
        // 判断有没有找到要派发的父级组件
        parent.$emit.apply(parent, [eventName].concat(params)); // 调用父级的派发方法
      }
    },
    // 广播
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params); // this指向当前调用该方法的父组件
    }
  }
};
```
