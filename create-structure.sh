#!/bin/bash

# Root files
touch .env.example .env.local .firebaserc .gitignore .eslintrc.cjs .prettierrc \
eslint.config.js README.md package.json package-lock.json vite.config.js \
tailwind.config.js postcss.config.js index.html service-worker.js workbox-config.js \
firebase.json firestore.rules firestore.indexes.json storage.rules start.sh fix-firebase.sh \
fix-vite.sh apply_code.sh fill_all_code.sh

# VSCode settings
mkdir -p .vscode
touch .vscode/settings.json

# Functions
mkdir -p functions/helpers functions/schedulers
touch functions/index.js functions/package.json functions/schedulers/index.js functions/schedulers/package.json
touch functions/helpers/{abandonedCart.js,admin.js,affiliate.js,analytics.js,cod.js,commissions.js,csvImport.js,invoices.js,inventorySync.js,notifications.js,payouts.js,paypal.js,qr.js,razorpay.js,recommendations.js,returns.js,reviews.js,searchSync.js,shipping.js,wallet.js}

# Public
mkdir -p public/assets public/icons public/qrcodes
touch public/favicon.svg public/logo.svg public/manifest.json public/robots.txt

# Src base
mkdir -p src/assets src/components src/context src/hooks src/locales src/middlewares src/pages/Auth \
src/pages/User src/pages/Admin src/pages/Rider src/pages/Vendor src/services src/tests/components \
src/tests/services src/themes src/utils
touch src/{main.jsx,App.jsx,router.jsx,firebase.js,index.css,constants.js,utils.js,sw-registration.js
#!/bin/bash
set -e

echo "📂 Root folders & files बना रहे हैं..."

# Root files
touch .env.example .env.local .firebaserc .gitignore .eslintrc.cjs .prettierrc \
      eslint.config.js README.md package.json package-lock.json vite.config.js \
      tailwind.config.js postcss.config.js index.html service-worker.js \
      workbox-config.js firebase.json firestore.rules firestore.indexes.json \
      storage.rules start.sh fix-firebase.sh fix-vite.sh apply_code.sh fill_all_code.sh

# VSCode settings folder
mkdir -p .vscode
touch .vscode/settings.json

# Functions
mkdir -p functions/helpers functions/schedulers
touch functions/index.js functions/package.json \
      functions/schedulers/index.js functions/schedulers/package.json

# Public
mkdir -p public/assets public/icons public/qrcodes
touch public/favicon.svg public/logo.svg public/manifest.json public/robots.txt

# Src
mkdir -p src/assets src/components src/context src/hooks src/locales \
         src/middlewares src/pages/Auth src/pages/User src/pages/Admin \
         src/pages/Rider src/pages/Vendor src/services src/tests/components \
         src/tests/services src/themes src/utils
touch src/main.jsx src/App.jsx src/router.jsx src/firebase.js src/index.css \
      src/constants.js src/utils.js src/sw-registration.js

echo "✅ Root structure create हो गया (Part 1 पूरा)"
echo "🧩 Components बना रहे हैं..."

mkdir -p src/components

touch src/components/AddToCartButton.jsx \
      src/components/AddressForm.jsx \
      src/components/AdminOrderRow.jsx \
      src/components/AdminProductForm.jsx \
      src/components/AdminRoute.jsx \
      src/components/AdminSidebar.jsx \
      src/components/CSVUploader.jsx \
      src/components/ChartCard.jsx \
      src/components/CheckoutButton.jsx \
      src/components/ConfirmDialog.jsx \
      src/components/CouponInput.jsx \
      src/components/FlashSaleBadge.jsx \
      src/components/FlashSaleBanner.jsx \
      src/components/Footer.jsx \
      src/components/ImageUploader.jsx \
      src/components/LoadingSpinner.jsx \
      src/components/LoyaltyWidget.jsx \
      src/components/Navbar.jsx \
      src/components/NotificationToast.jsx \
      src/components/OrderStatusStepper.jsx \
      src/components/Pagination.jsx \
      src/components/PaymentMethodSelector.jsx \
      src/components/PaymentSummary.jsx \
      src/components/PreOrderBadge.jsx \
      src/components/PriceTag.jsx \
      src/components/ProductCard.jsx \
      src/components/ProtectedRoute.jsx \
      src/components/QRConfirm.jsx \
      src/components/QRScanner.jsx \
      src/components/QuantitySelector.jsx \
      src/components/RatingStars.jsx \
      src/components/ReferralWidget.jsx \
      src/components/RiderMap.jsx \
      src/components/RiderOrderCard.jsx \
      src/components/RiderRoute.jsx \
      src/components/SavedInstruments.jsx \
      src/components/SearchBar.jsx \
      src/components/StockAlertButton.jsx \
      src/components/VariantSelector.jsx \
      src/components/VendorRoute.jsx \
      src/components/VendorSidebar.jsx \
      src/components/ReviewForm.jsx \
      src/components/ReviewList.jsx \
      src/components/ChatBox.jsx \
      src/components/VendorProfileCard.jsx

echo "✅ Components (Part 2) बन गए"
echo "🌀 Context & Hooks बना रहे हैं..."

# Context
mkdir -p src/context
touch src/context/AdminContext.jsx \
      src/context/AuthContext.jsx \
      src/context/CartContext.jsx \
      src/context/LoyaltyContext.jsx \
      src/context/ReferralContext.jsx \
      src/context/AffiliateContext.jsx

# Hooks
mkdir -p src/hooks
touch src/hooks/useAuth.js \
      src/hooks/useCart.js \
      src/hooks/useDebounce.js \
      src/hooks/useDeliverySlots.js \
      src/hooks/useFirestoreQuery.js \
      src/hooks/useFlashSaleTimer.js \
      src/hooks/useLoyalty.js \
      src/hooks/useNotifications.js \
      src/hooks/usePWA.js \
      src/hooks/usePaymentMethods.js \
      src/hooks/useReferral.js \
      src/hooks/useVariants.js

echo "✅ Context & Hooks (Part 3) बन गए"
echo "📑 Pages बना रहे हैं..."

# Auth Pages
mkdir -p src/pages/Auth
touch src/pages/Auth/Login.jsx \
      src/pages/Auth/Signup.jsx \
      src/pages/Auth/NotFound.jsx

# User Pages
mkdir -p src/pages/User
touch src/pages/User/Home.jsx \
      src/pages/User/Cart.jsx \
      src/pages/User/Checkout.jsx \
      src/pages/User/Orders.jsx \
      src/pages/User/OrderDetails.jsx \
      src/pages/User/ProductDetails.jsx \
      src/pages/User/Profile.jsx \
      src/pages/User/Wishlist.jsx \
      src/pages/User/WishlistShare.jsx \
      src/pages/User/ResellerDashboard.jsx

# Admin Pages
mkdir -p src/pages/Admin
touch src/pages/Admin/Dashboard.jsx \
      src/pages/Admin/Products.jsx \
      src/pages/Admin/ProductEdit.jsx \
      src/pages/Admin/BulkUpload.jsx \
      src/pages/Admin/Orders.jsx \
      src/pages/Admin/Cancellations.jsx \
      src/pages/Admin/Returns.jsx \
      src/pages/Admin/Reports.jsx \
      src/pages/Admin/Analytics.jsx \
      src/pages/Admin/Coupons.jsx \
      src/pages/Admin/FlashSales.jsx \
      src/pages/Admin/PreOrders.jsx \
      src/pages/Admin/StockAlerts.jsx \
      src/pages/Admin/Riders.jsx \
      src/pages/Admin/Vendors.jsx \
      src/pages/Admin/Payouts.jsx \
      src/pages/Admin/Settings.jsx

# Rider Pages
mkdir -p src/pages/Rider
touch src/pages/Rider/RiderPanel.jsx \
      src/pages/Rider/RiderOrderDetails.jsx

# Vendor Pages
mkdir -p src/pages/Vendor
touch src/pages/Vendor/VendorPanel.jsx \
      src/pages/Vendor/VendorOrders.jsx \
      src/pages/Vendor/VendorProducts.jsx \
      src/pages/Vendor/VendorPayouts.jsx \
      src/pages/Vendor/VendorStorefront.jsx

echo "✅ Pages (Part 4) बन गए"
echo "🧩 Components बना रहे हैं..."

mkdir -p src/components

touch src/components/AddToCartButton.jsx \
      src/components/AddressForm.jsx \
      src/components/AdminOrderRow.jsx \
      src/components/AdminProductForm.jsx \
      src/components/AdminRoute.jsx \
      src/components/AdminSidebar.jsx \
      src/components/CSVUploader.jsx \
      src/components/ChartCard.jsx \
      src/components/CheckoutButton.jsx \
      src/components/ConfirmDialog.jsx \
      src/components/CouponInput.jsx \
      src/components/FlashSaleBadge.jsx \
      src/components/FlashSaleBanner.jsx \
      src/components/Footer.jsx \
      src/components/ImageUploader.jsx \
      src/components/LoadingSpinner.jsx \
      src/components/LoyaltyWidget.jsx \
      src/components/Navbar.jsx \
      src/components/NotificationToast.jsx \
      src/components/OrderStatusStepper.jsx \
      src/components/Pagination.jsx \
      src/components/PaymentMethodSelector.jsx \
      src/components/PaymentSummary.jsx \
      src/components/PreOrderBadge.jsx \
      src/components/PriceTag.jsx \
      src/components/ProductCard.jsx \
      src/components/ProtectedRoute.jsx \
      src/components/QRConfirm.jsx \
      src/components/QRScanner.jsx \
      src/components/QuantitySelector.jsx \
      src/components/RatingStars.jsx \
      src/components/ReferralWidget.jsx \
      src/components/RiderMap.jsx \
      src/components/RiderOrderCard.jsx \
      src/components/RiderRoute.jsx \
      src/components/SavedInstruments.jsx \
      src/components/SearchBar.jsx \
      src/components/StockAlertButton.jsx \
      src/components/VariantSelector.jsx \
      src/components/VendorRoute.jsx \
      src/components/VendorSidebar.jsx \
      src/components/ReviewForm.jsx \
      src/components/ReviewList.jsx \
      src/components/ChatBox.jsx \
      src/components/VendorProfileCard.jsx

echo "✅ Components (Part 5) बन गए"
echo "🌍 Context बना रहे हैं..."

mkdir -p src/context

touch src/context/AdminContext.jsx \
      src/context/AuthContext.jsx \
      src/context/CartContext.jsx \
      src/context/LoyaltyContext.jsx \
      src/context/ReferralContext.jsx \
      src/context/AffiliateContext.jsx

echo "✅ Context (Part 6) बन गए"

echo "🪝 Hooks बना रहे हैं..."

mkdir -p src/hooks

touch src/hooks/useAuth.js \
      src/hooks/useCart.js \
      src/hooks/useDebounce.js \
      src/hooks/useDeliverySlots.js \
      src/hooks/useFirestoreQuery.js \
      src/hooks/useFlashSaleTimer.js \
      src/hooks/useLoyalty.js \
      src/hooks/useNotifications.js \
      src/hooks/usePWA.js \
      src/hooks/usePaymentMethods.js \
      src/hooks/useReferral.js \
      src/hooks/useVariants.js

echo "✅ Hooks (Part 7) बन गए"
echo "📑 Pages बना रहे हैं..."

mkdir -p src/pages/{Auth,User,Admin,Rider,Vendor}

# Auth Pages
touch src/pages/Auth/{Login.jsx,Signup.jsx,ForgotPassword.jsx,OTPLogin.jsx}

# User Pages
touch src/pages/User/{Home.jsx,Cart.jsx,Checkout.jsx,Orders.jsx,OrderDetails.jsx,ProductDetails.jsx,Profile.jsx,Wishlist.jsx,WishlistShare.jsx,ResellerDashboard.jsx}

# Admin Pages
touch src/pages/Admin/{Dashboard.jsx,Products.jsx,ProductEdit.jsx,BulkUpload.jsx,Orders.jsx,Cancellations.jsx,Returns.jsx,StockAlerts.jsx,Coupons.jsx,FlashSales.jsx,PreOrders.jsx,Riders.jsx,Vendors.jsx,Payouts.jsx,Reports.jsx,Analytics.jsx,Settings.jsx}

# Rider Pages
touch src/pages/Rider/{RiderPanel.jsx,RiderOrderDetails.jsx}

# Vendor Pages
touch src/pages/Vendor/{VendorPanel.jsx,VendorProducts.jsx,VendorOrders.jsx,VendorPayouts.jsx,VendorStorefront.jsx}

# Common (User facing)
touch src/pages/{NotFound.jsx}

echo "✅ Pages (Part 8) बन गए"
echo "🔌 Services बना रहे हैं..."

mkdir -p src/services

touch src/services/{auth.js,users.js,products.js,orders.js,cart.js,payments.js,coupons.js,flashSales.js,preorders.js,returns.js,cancellations.js,stockAlerts.js,inventorySync.js,vendors.js,riders.js,payouts.js,reports.js,analytics.js,notifications.js,loyalty.js,wallet.js,referral.js,affiliate.js,commissions.js,shipping.js,search.js,recommendations.js,reviews.js,chat.js,dropshipping.js,storage.js,geo.js}

echo "✅ Services (Part 9) बन गए"
echo "🧰 Utils बना रहे हैं..."

mkdir -p src/utils

# Helpers / utilities (सब आपके tree के हिसाब से)
touch src/utils/{aiRecommendations.js,barcode.js,constants.js,currency.js,dates.js,filters.js,firebaseCollections.js,geo.js,helpers.js,paypal.js,pwa.js,qr.js,razorpay.js,validators.js,stockAlerts.js,orderStatus.js,lotteryHelpers.js,formatDate.js}

echo "✅ Utils (Part 10) बन गए"
echo "⚡ Cloud Functions Helpers बना रहे हैं..."

mkdir -p functions/helpers

touch functions/helpers/{admin.js,abandonedCart.js,cod.js,csvImport.js,invoices.js,notifications.js,payouts.js,paypal.js,qr.js,razorpay.js,recommendations.js,wallet.js,inventorySync.js,affiliate.js,analytics.js,returns.js,shipping.js,reviews.js,searchSync.js,vendor.js}

echo "✅ Cloud Functions Helpers (Part 11) बन गए"
echo "⏰ Cloud Functions Schedulers बना रहे हैं..."

mkdir -p functions/schedulers

touch functions/schedulers/{index.js,package.json,abandonedCartReminder.js,payoutScheduler.js,inventorySyncScheduler.js,flashSaleScheduler.js,loyaltyPointsScheduler.js,referralBonusScheduler.js,affiliateReportScheduler.js,backupScheduler.js}

echo "✅ Cloud Functions Schedulers (Part 12) बन गए"
echo "📄 Pages structure बना रहे हैं..."

mkdir -p src/pages/{Auth,User,Admin,Rider,Vendor,Reseller}

# Auth Pages
touch src/pages/Auth/{Login.jsx,Signup.jsx,ForgotPassword.jsx,OTPLogin.jsx}

# User Pages
touch src/pages/User/{Home.jsx,Cart.jsx,Checkout.jsx,Wishlist.jsx,WishlistShare.jsx,Orders.jsx,OrderDetails.jsx,Profile.jsx,NotFound.jsx,SearchResults.jsx,CategoryPage.jsx,ProductDetails.jsx}

# Admin Pages
touch src/pages/Admin/{Dashboard.jsx,Products.jsx,ProductEdit.jsx,BulkUpload.jsx,Coupons.jsx,FlashSales.jsx,Orders.jsx,Cancellations.jsx,Returns.jsx,Reports.jsx,Analytics.jsx,Payouts.jsx,PreOrders.jsx,StockAlerts.jsx,Riders.jsx,Vendors.jsx,Settings.jsx}

# Vendor Pages
touch src/pages/Vendor/{VendorPanel.jsx,VendorProducts.jsx,VendorOrders.jsx,VendorPayouts.jsx,VendorStorefront.jsx}

# Rider Pages
touch src/pages/Rider/{RiderPanel.jsx,RiderOrderDetails.jsx}

# Reseller Pages
touch src/pages/Reseller/{ResellerDashboard.jsx,AffiliateDashboard.jsx}

echo "✅ Pages (Part 13) बन गए"
echo "🧩 Components structure बना रहे हैं..."

mkdir -p src/components

# Common Components
touch src/components/{Navbar.jsx,Footer.jsx,SearchBar.jsx,LoadingSpinner.jsx,ConfirmDialog.jsx,NotificationToast.jsx,Pagination.jsx,RatingStars.jsx,ImageUploader.jsx,PriceTag.jsx,QuantitySelector.jsx,VariantSelector.jsx,StockAlertButton.jsx,FlashSaleBadge.jsx,FlashSaleBanner.jsx,AddToCartButton.jsx,PaymentSummary.jsx,PaymentMethodSelector.jsx,CouponInput.jsx}

# Auth / User
touch src/components/{AddressForm.jsx,SavedInstruments.jsx,LoyaltyWidget.jsx,ReferralWidget.jsx,ReviewForm.jsx,ReviewList.jsx,WishlistCard.jsx,ChatBox.jsx}

# Admin
touch src/components/{AdminSidebar.jsx,AdminRoute.jsx,AdminOrderRow.jsx,AdminProductForm.jsx,ChartCard.jsx,CSVUploader.jsx}

# Rider
touch src/components/{RiderSidebar.jsx,RiderRoute.jsx,RiderOrderCard.jsx,RiderMap.jsx}

# Vendor
touch src/components/{VendorSidebar.jsx,VendorRoute.jsx,VendorProfileCard.jsx}

# QR / Payment / Checkout
touch src/components/{CheckoutButton.jsx,QRScanner.jsx,QRConfirm.jsx,PreOrderBadge.jsx}

echo "✅ Components (Part 14) बन गए"
echo "⚙️ Services structure बना रहे हैं..."

mkdir -p src/services

# Orders & Payments
touch src/services/{orders.js,payments.js,wallet.js,invoices.js,coupons.js}

# Products & Inventory
touch src/services/{products.js,variants.js,inventorySync.js,stockAlerts.js,flashSales.js,preorders.js,recommendations.js,reviews.js,search.js}

# Users & Vendors
touch src/services/{riders.js,vendor.js,shipping.js,returns.js,commissions.js,affiliate.js,referral.js,loyalty.js}

# Notifications & Communication
touch src/services/{notifications.js,chat.js}

# Reports & Analytics
touch src/services/{reports.js,cancellations.js,payouts.js}

echo "✅ Services (Part 15) बन गए"
echo "🛠 Utils structure बना रहे हैं..."

mkdir -p src/utils

# Core helpers
touch src/utils/{constants.js,validators.js,filters.js,currency.js,dates.js,geo.js}

# Payment helpers
touch src/utils/{razorpay.js,paypal.js,qr.js,barcode.js}

# Firebase / PWA
touch src/utils/{firebaseCollections.js,pwa.js}

# AI & Recommendations
touch src/utils/aiRecommendations.js

echo "✅ Utils (Part 16) बन गए"
echo "🧪 Tests structure बना रहे हैं..."

mkdir -p src/tests/{components,services,hooks,utils}

# Component tests
touch src/tests/components/{App.test.jsx,ProductCard.test.jsx,Cart.test.jsx}

# Service tests
touch src/tests/services/{orders.test.js,payments.test.js,auth.test.js}

# Hook tests
touch src/tests/hooks/{useAuth.test.js,useCart.test.js}

# Utils tests
touch src/tests/utils/{currency.test.js,validators.test.js}

echo "✅ Tests (Part 17) बन गए"
echo "🎨 Themes structure बना रहे हैं..."

# Themes folder
mkdir -p src/themes

# Theme files
touch src/themes/{ThemeProvider.jsx,ThemeToggle.jsx,tailwind.theme.js}

echo "✅ Themes (Part 18) बन गए"
echo "🛡️ Middlewares structure बना रहे हैं..."

# Middlewares folder (already created earlier but we add files now)
mkdir -p src/middlewares

# Middleware files
touch src/middlewares/{authGuard.js,adminGuard.js,vendorGuard.js,riderGuard.js,logger.js,errorHandler.js}

echo "✅ Middlewares (Part 19) बन गए"
echo "🌍 Locales structure बना रहे हैं..."

# Locales folder
mkdir -p src/locales

# Language JSON files
touch src/locales/{en.json,hi.json,gu.json,bn.json,ta.json}

echo "✅ Locales (Part 20) बन गए"
echo "🧪 Testing structure बना रहे हैं..."

# Testing folders
mkdir -p src/tests/{unit,integration,e2e}

# Example test files
touch src/tests/unit/{cartContext.test.js,utils.test.js,filters.test.js}
touch src/tests/integration/{checkoutFlow.test.js,loginFlow.test.js}
touch src/tests/e2e/{fullPurchase.test.js,adminDashboard.test.js}

echo "✅ Testing structure (Part 21) बन गया"
echo "⚙️ CI/CD setup बना रहे हैं..."

# GitHub Actions folder
mkdir -p .github/workflows

# Workflow file
touch .github/workflows/deploy.yml

echo "✅ CI/CD structure (Part 22) बन गया"
