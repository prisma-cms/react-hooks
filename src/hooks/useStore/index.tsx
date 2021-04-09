import { useCallback, useMemo, useState } from 'react'

/**
 * Стейт-хранилище с геттерем и сеттерем
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStore = <Data extends Record<string, any>>(initialStore: Data) => {
  const [store, updateStore] = useState<Data>(initialStore)

  // type Data = typeof store
  type Name = keyof Data

  /**
   * Получаем текущее значение объекта
   */
  const getValue = useCallback(
    <N extends Name>(name: N) => {
      return store[name]
    },
    [store]
  )

  const setValue = useCallback(
    <N extends Name>(name: N, value: Data[N]) => {
      updateStore({
        ...store,
        [name]: value,
      })
    },
    [store]
  )

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = event.currentTarget.name as Name
      const value = event.currentTarget.value as Data[Name]

      if (!name) {
        return
      }

      setValue(name, value)
    },
    [setValue]
  )

  return useMemo(() => {
    return {
      store,
      updateStore,
      setValue,
      getValue,
      onChange,
    }
  }, [getValue, setValue, store, onChange])
}

export default useStore
