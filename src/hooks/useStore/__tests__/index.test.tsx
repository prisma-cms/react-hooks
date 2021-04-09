
import React from 'react';
import useStore from '..'
import { render } from '../../../../dev/tests/utils';

describe('Component', () => {
  it('Render default', () => {

    const Component: React.FC = () => {

      type Test = {
        name: string,
        age?: number
      }

      const {
        store,
        getValue,
      } = useStore<Test>({
        name: "Jack",
      });

      expect(store).toMatchSnapshot("store")

      const name = getValue("name");

      expect(name).toMatchSnapshot("store:name")

      return <>Test</>;
    }


    const tree = render(<Component />)
    const node = tree.container.children[0]
    expect(tree.container).toMatchSnapshot()
    expect(node).toMatchSnapshot()

  })

})
