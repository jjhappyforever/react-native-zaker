package com.zaker;

import android.view.View;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by plus on 16/7/19.
 * 自定义删除对话框-->RN 调用
 */
public class ReactRemoveChannelModule extends ReactContextBaseJavaModule{

    public static final String REACT_CLASS = "RCTRemoveChannel";


    public ReactRemoveChannelModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    //注写 该方法为RN调用方法.
    @ReactMethod
    public void show(String title, final Callback callback){
       final  RemoveChannelDialog removeChannelDialog=new RemoveChannelDialog(getCurrentActivity());
        removeChannelDialog.show(title);
        removeChannelDialog.setPositiveButtonListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                removeChannelDialog.dismiss();
                //回调给RN
                callback.invoke(true);
            }
        });
    }


}
