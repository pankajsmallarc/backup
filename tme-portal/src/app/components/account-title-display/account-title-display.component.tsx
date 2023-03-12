import { useAccountInfo } from '../../feature/ReviewFinalSelections/useCases/useAccountInfo.case'
import Mask from '../mask/mask.component'

const AccountTitle = ({ accountNumber }: { accountNumber: string }) => {
  const [accountMap] = useAccountInfo()
  return (
    <div>
      {accountMap && (
        <div>
          <h5>{accountMap[accountNumber]?.accountName?.value}</h5>
          <Mask>{accountNumber}</Mask>
          {` | `}
          {accountMap[accountNumber]?.accountType?.value}
        </div>
      )}
    </div>
  )
}

export default AccountTitle
