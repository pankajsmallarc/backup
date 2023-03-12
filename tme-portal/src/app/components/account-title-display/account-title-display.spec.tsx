import { validateresponse } from '../../utils/data-mock'
import AccountTitle from './account-title-display.component'
import { renderWithContext } from '../../utils/test-utils'

it('component is successfully rendered', async () => {
  const { baseElement } = renderWithContext(
    <AccountTitle accountNumber="1746379153" />,
    { validate: validateresponse },
  )
  expect(baseElement).toBeTruthy()
})
