import { useCallback, useMemo, useState } from 'react'

/**
 * Стейт-хранилище с геттерем и сеттерем
 */
const useStore = <Data extends Record<string, any>>(
  initialStore: Data | null
) => {
  const [store, updateStore] = useState<Data | null>(initialStore)

  // type Data = typeof store
  type Name = keyof Data

  /**
   * Получаем текущее значение объекта
   */
  const getValue = useCallback(
    <N extends Name>(name: N) => {
      return store ? store[name] : undefined
    },
    [store]
  )

  const setValue = useCallback(
    <N extends Name>(name: N, value: Data[N]) => {
      /**
       * Нельзя устанавливать значение, если еще нет хранилища
       */
      // TODO Пофиксить. Может добавить метод начала редактирования.
      // if (!store) {
      //   throw new Error('Нельзя задать значение пустому хранилищу')
      // }

      // store &&
      // updateStore({
      //   ...store,
      //   [name]: value,
      // })

      // TODO Пока что сделал через Object.assign(), но это не идеальное решение,
      // Так как если хранилище должно содержать некоторое количество обязательных полей,
      // то здесь в случае отсутствия хранилища их не будет, а установится только заданное поле.
      updateStore(Object.assign({}, store, {
        [name]: value,
      }))
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
