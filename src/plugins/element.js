import Vue from 'vue'
// 按需导入
import {
  Button,
  Form,
  FormItem,
  Input,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Pagination,
  Message,
  dialog,
  DatePicker,
  Select,
  Option,
  Row,
  Col,
  Switch,
  Tooltip
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(MenuItemGroup)
Vue.use(dialog)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)
Vue.use(Switch)
Vue.use(Tooltip)

//  Vue原型对象的挂载
Vue.prototype.$message = Message
