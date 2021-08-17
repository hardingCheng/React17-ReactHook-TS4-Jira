import { useAuth } from 'pages/context/auth-context'
import qs from 'qs'
import * as auth from '../pages/auth-provider'

const apiUrl = process.env.REACT_APP_API_URL

// eslint-disable-next-line no-undef
interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常.fetch不会抛出异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}


// JS 中的typeof，是在runtime时运行的
// return typeof 1 === 'number'
// TS 中的typeof，是在静态环境运行的
// 在整个useHttp处理请求
export const useHttp = () => {
  const { user } = useAuth()
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return (...[ endpoint, config ]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}


// 类型别名、Utility Type 讲解
// 联合类型
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
let jackFavoriteNumber: string | number

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string;
// }
// type Person = { name: string }
// const xiaoMing: Person = { name: 'xiaoming' }


// 联合类型和类型别名  交叉类型只能使用type不是使用interface
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = '6'

// utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
// interface 也没法实现Utility type
type Person = {
  name: string;
  age: number;
};
// 类型属性都是可选的，可以不传入任何熟悉感
const xiaoMing: Partial<Person> = {}
// 既没有age没有name
const shenMiRen: Omit<Person, 'name' | 'age'> = {}
// 把对象类型的键取出来
type PersonKeys = keyof Person;
// 在原有类型中选几个
type PersonOnlyName = Pick<Person, 'name' | 'age'>;
// 在把name从原来过滤掉
type PersonKeys1 = keyof Person;
type Age = Exclude<PersonKeys1, 'name'>;

// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};

