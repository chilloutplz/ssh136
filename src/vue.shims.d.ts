// vue.shims.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 첫 번째와 두 번째 인자(Props와 RawBindings)에 {} 대신 object 또는 any를 사용합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>
  export default component
}
