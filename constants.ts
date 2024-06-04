enum ENV {
  DEV = 'DEV',
  CN_QA = 'CN_QA',
  KR_QA = 'KR_QA',
  BETA_CN = 'BETA_CN',
}

export const DOMAIN = {
  INDEX: 'https://qa1.thermofisher.cn',
  CN_QA: 'https://qa1-chemicals.thermofisher.cn',
  KR_QA: 'https://qa1-chemicals.thermofisher.kr',
  DEV: 'http://10.83.4.195',
  LOCAL: 'http://localhost:3000',
  BETA_CN: 'https://beta-chemicals.thermofisher.cn',
};

export const env = ENV.CN_QA;
export const domain = DOMAIN[env];
export const krDomain = DOMAIN.KR_QA;

export const PAGES = {
  home: `${domain}/cn/zh/home.html`,
  welcome: `${domain}/apac/welcome`,
  welcomeKr: `${domain}/apac/welcome`,
  index: `${domain}/cn/zh/home.html`,
  cart: `${domain}/apac/cart`,
  checkout: `${domain}/apac/checkout`,
  login: `${domain}/auth/login?returnUrl=${domain}/apac/cart`,
  product: `${domain}/apac/product`,
  registration: `${domain}/store/v2/accounts/registration`,
  contactUs: `${domain}/cn/zh/home/support/contact-us.html`,
  contactUsKr: `${domain}/kr/ko/home/support/contact-us.html`,
  chinaFreightRule: `${domain}/apac/freight`,
  periodicTableElements: `${domain}/cn/zh/home/chemicals/interactive-periodic-table-elements.html`,
  quickOrder: `${domain}/apac/quick-order`,
};

export const PAGES_SEARCH_PDP = {
  search: `${domain}/apac/search/search-result`,
  category: `${domain}/apac/search/category/90347060`,
  structureSearch: `${domain}/apac/search/structure`,
  searchResultStructure: `${domain}/apac/search/search-result/structure`,
  documentSearch: `${domain}/apac/document-search`,
  productDetail: `${domain}/apac/product/L11251.03`,
  customBulk: `${domain}/apac/custom-bulk`,
  requestForm: `${domain}/apac/request-form`,
};

export const PAGES_CSR = {
  orderList: `${domain}/apac/admin/order-management/search-order`,
  orderDetail: `${domain}/apac/admin/order-management/order-details`,
  skuNotes: `${domain}/apac/admin/sku-notes`,
  dropShip: `${domain}/apac/admin/drop-ship`,
  promotion: `${domain}/apac/admin/promotion`,
};

export const PAGES_USER_ACCOUNT = {
  profile: `${domain}/store/v2/account-center/my-account/profile`,
  editProfile: `${domain}/store/v2/account-center/my-account/profile/edit-general-info`,
  stBt: `${domain}/store/v2/account-center/my-account/profile/shipping-and-billing`,
  editStBt: `${domain}/store/v2/account-center/my-account/profile/shipping-and-billing/edit-shipping-address/4455531318`,
  manageApproval: `${domain}/store/v2/account-center/my-account/profile/manage-approval-routing`,
  myFavorites: `${domain}/apac/favorites`,
  orderHistoryList: `${domain}/apac/order-history`,
  orderHistoryDetail: `${domain}/apac/order-detail?orderid=12102`,
  paymentList: `${domain}/apac/payment-history`,
};
