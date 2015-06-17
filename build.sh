#!/bin/bash

# Stop the build if there is any error
set -e
ROOT=`pwd`
git clean -fdx
# Install npm packages
echo "*******************************"
echo "Installing npm packages"
npm install
echo "done"
echo "*******************************"

# Run tests
echo "*******************************"
echo "Running tests ..."
sh ./stub.sh restart
grunt shell:mocha
sh ./stub.sh stop
echo "done"
echo "*******************************"

# Run grunt build to package the relevant files
echo "*******************************"
echo "Building for Staging..."
grunt build_staging
echo "done"
echo "*******************************"

rm -rf artifacts
mkdir artifacts

# Build Android Staging release apk
echo "*******************************"
echo "Building Android Staging apk"
$(npm bin)/cordova --verbose build android --release
echo "done"
echo "*******************************"

cp platforms/android/ant-build/SalesMgmt-release.apk artifacts/SalesMgmt-Staging.apk

# Build IOS Staging release apk
echo "*******************************"
echo "Building IOS Staging apk"
$(npm bin)/cordova --verbose build ios
echo "done"
echo "*******************************"
echo "Setting up profiles..."
chmod +x ./set_provisioning.sh
chmod +x ./mpParse
./set_provisioning.sh ./platforms/ios/Sales_Management_Developer.mobileprovision
./set_provisioning.sh ./platforms/ios/Sales_Management_Appstore.mobileprovision
cd platforms/ios
#xcodebuild -sdk iphoneos -scheme "Sales Management" clean archive -archivePath $ROOT/artifacts/SalesMgmt-Staging.xcarchive CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
ant -Drelease=Staging 
cd ../..
#xcodebuild -exportArchive -archivePath ./artifacts/SalesMgmt-Staging.xcarchive -exportPath ./artifacts/SalesMgmt-Staging.ipa -exportFormat ipa -exportProvisioningProfile "Sales_Management_Developer"

# Run grunt build to package the relevant files
echo "*******************************"
echo "Building for Prod..."
grunt build_prod
echo "done"
echo "*******************************"

# Build Android Staging release apk
echo "*******************************"
echo "Building Android Prod apk"
$(npm bin)/cordova --verbose build android --release
echo "done"
echo "*******************************"
cp platforms/android/ant-build/SalesMgmt-release.apk artifacts/SalesMgmt-Prod.apk

# Build IOS Staging release apk
echo "*******************************"
echo "Building IOS Staging apk"
$(npm bin)/cordova --verbose build ios
echo "done"
echo "*******************************"
cd platforms/ios
#xcodebuild -sdk iphoneos -scheme "Sales Management" clean archive -archivePath $ROOT/artifacts/SalesMgmt-Prod.xcarchive CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED=NO
ant -Drelease=Prod 
cd ../..
#xcodebuild -exportArchive -archivePath ./artifacts/SalesMgmt-Prod.xcarchive -exportPath ./artifacts/SalesMgmt-Prod.ipa -exportFormat ipa -exportProvisioningProfile "Sales_Management_Appstore"
