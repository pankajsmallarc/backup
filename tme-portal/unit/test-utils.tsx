import { render } from '@testing-library/react'
import { getStoreWithState, RootState } from '../store/store'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { CustomerRelationshipsState } from '../models/customer-detail.interface'
import { ServiceConfigurationState } from '../models/products.interface'
import { CartState } from '../models/cart.interface'
import {
  initialState as queueInitialState,
  QueueState,
} from '../feature/EnrollmentQueue/service/store/queue.slice'
import {
  CustomerState,
  initialState as customerSearchInitialState,
} from '../feature/CustomerSearch/service/store/customer-search.slice'
import { initialState as customerEnrollmentInitialState } from '../feature/CustomerProfile/service/store/customerProfile.slice'
import { initialState as enrollmentInitialState } from '../components/enrollment/store/enrollment.slice'
import { initialState as requiredDocumentInitialState } from '../components/agreements-required/service/store/agreements-required.slice'
import {
  initialState as billingConfigurationIntialState,
  IBillingInformationState,
} from '../feature/BillingInformation/service/store/BI.slice'

import {
  initialState as tirInitialState,
  ITIRState,
} from '../feature/TreasuryReport/service/store/TIR.slice'
import { initialState as treasuryPaymentInitialState } from '../feature/TreasuryPayment/service/store/TPA.slice'

import {
  CoreState,
  initialState as coreInitialState,
} from '../store/store.slice'
import { EnrollmentState } from '../models/enrollment.interface'
import { initialState as productConfiguratoinInitialState } from '../components/product-configuration-layout/store/product.configuration.slice'
import { MemoryHistory } from 'history'
import { CustomerEnrollmentState } from '../models/customer-enrollments.interface'
import { ProductConfigurationState } from '../models/product-configuration'
import {
  initialState as ProductSelectionInitialState,
  ProductSelectionState,
} from '../feature/ProductSelection/service/store/product-selection.slice'

import {
  initialState as positivePayCheckInitialState,
  IPositivePayCheckState,
} from '../feature/PositivePay-Check/service/store/PPC.slice'

import {
  initialState as companyProfileInitialState,
  ICompanyProfileState,
} from '../feature/CompanyProfile/service/store/companyProfile.slice'
import { initialState as validateState } from '../feature/ReviewFinalSelections/service/store/review.slice'
import {
  RequiredDocument,
  RequiredDocumentsState,
} from '../models/required-documents.interface'
import {
  initialState as PPAInitialState,
  IPPAState,
} from '../feature/PositivePay-ACH/service/store/PPA.slice'

import {
  initialState as CbcProfileInitialState,
  ICbcProfileState,
} from '../feature/ComericaBusinessConnect/service/store/CBC.slice'

import {
  initialState as IBdcInitialState,
  IBDCState,
} from '../feature/BusinessDeposit/service/store/BDC.slice'
import {
  initialState as CbcUserProfileInitialState,
  ICbcUserProfileState,
} from '../feature/Users/service/store/user-profile.slice'
import { BannerState } from '../models/banner.interface'
import { initialState as bannerInitialState } from '../components/banner/banner.slice'
import {
  initialState as TMLInitialState,
  ITMLState,
} from '../feature/TreasuryLoan/service/store/TML.slice'
import {
  initialState as reportInitialState,
  IReportState,
} from '../feature/EnrollmentReports/service/store/enrollmentReports.slice'
import {
  initialState as addBusinessInitialState,
  IAddBusinessState,
} from '../feature/AddBusiness/service/store/AB.slice'
import {
  initialState as errorInitialState,
  ErrorState,
} from '../store/error.slice'
import {
  initialState as accountSelectionInitialState,
  IAccountSelectionState,
} from '../feature/AccountSelection/service/store/AccountSelection.slice'
import {
  initialState as ReviewAndSubmitIntialState,
  ReviewAndSubmitState,
} from '../feature/ReviewAndSubmit/service/store/ReviewAndSubmit.slice'

export function renderWithContext(
  element: JSX.Element,
  state?: RootState,
  history?: MemoryHistory,
  extra?: any,
) {
  const store = getStoreWithState(state, extra)

  const utils = render(
    <Provider store={store}>
      {history ? (
        <Router history={history}>{element}</Router>
      ) : (
        <BrowserRouter>{element}</BrowserRouter>
      )}
    </Provider>,
  )
  return { store, ...utils }
}

export function getStateWithItems({
  coreState = coreInitialState,
  positivePayCheckState = positivePayCheckInitialState,
  tirState = tirInitialState,
  pPAState = PPAInitialState,
  productSelectionState = ProductSelectionInitialState,
  customerSearchState = customerSearchInitialState,
  customerEnrollmentState = customerEnrollmentInitialState,
  requiredDocumentState = requiredDocumentInitialState,
  enrollmentState = enrollmentInitialState,
  productConfigurationState = productConfiguratoinInitialState,
  enrollmentQueueState = queueInitialState,
  cbcProfileState = CbcProfileInitialState,
  bdcState = IBdcInitialState,
  cbcUserProfileState = CbcUserProfileInitialState,
  bannerState = bannerInitialState,
  tmlState = TMLInitialState,
  reportState = reportInitialState,
  addBusinessState = addBusinessInitialState,
  accountSelectionState = accountSelectionInitialState,
  error = errorInitialState,
}: {
  coreState?: CoreState
  enrollmentQueueState?: QueueState
  positivePayCheckState?: IPositivePayCheckState
  tirState?: ITIRState
  pPAState?: IPPAState
  productSelectionState?: ProductSelectionState
  customerSearchState?: CustomerState
  customerDetailsState?: CustomerRelationshipsState
  serviceConfigurationState?: ServiceConfigurationState
  cartState?: CartState
  customerEnrollmentState?: CustomerEnrollmentState
  enrollmentState?: EnrollmentState
  companyProfileInitialState?: ICompanyProfileState
  requiredDocumentState?: RequiredDocumentsState
  productConfigurationState?: ProductConfigurationState
  cbcProfileState?: ICbcProfileState
  billingConfiguration?: IBillingInformationState
  reviewAndSubmit?: ReviewAndSubmitState
  bdcState?: IBDCState
  cbcUserProfileState?: ICbcUserProfileState
  bannerState?: BannerState
  tmlState?: ITMLState
  reportState?: IReportState
  addBusinessState?: IAddBusinessState
  accountSelectionState?: IAccountSelectionState
  error?: ErrorState
}): RootState {
  const state: RootState = {
    core: coreState,
    enrollmentQueue: enrollmentQueueState,
    positivePayCheck: positivePayCheckState,
    positivePayACH: pPAState,
    productSelection: productSelectionState,
    customerSearch: customerSearchState,
    validate: validateState,
    tir: tirState,
    bdc: bdcState,
    treasuryPayment: treasuryPaymentInitialState,
    customerEnrollments: customerEnrollmentState,
    billingConfiguration: billingConfigurationIntialState,
    reviewAndSubmit: ReviewAndSubmitIntialState,
    companyProfile: companyProfileInitialState,
    requiredDocuments: requiredDocumentState,
    enrollment: enrollmentState,
    productConfiguration: productConfigurationState,
    comericaBusinessConnect: cbcProfileState,
    cbcUserProfile: cbcUserProfileState,
    banner: bannerState,
    tml: tmlState,
    report: reportState,
    business: addBusinessState,
    account: accountSelectionState,
    error: errorInitialState,
  }
  return state
}
