package com.petapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import com.horcrux.svg.SvgPackage;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.beefe.picker.PickerViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.beefe.picker.PickerViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;

import cn.reactnative.httpcache.HttpCachePackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new RNFSPackage(),
            new SvgPackage(),
            new RNReactNativeDocViewerPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new PickerViewPackage(),
            new LinearGradientPackage(),
            new HttpCachePackage(),
            new ImagePickerPackage(),
                    new ReactVideoPackage(),
                    new PickerViewPackage(),
                    new LinearGradientPackage(),
                    new HttpCachePackage(),
                    new VectorIconsPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
