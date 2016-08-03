package com.zaker;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.TextView;

/**
 * Created by plus on 16/7/19.
 * 移除订阅栏目dialog--RN调用
 */
public class RemoveChannelDialog extends Dialog {

    private Context mContext;
    private TextView dialog_title;
    private TextView dialog_down_cancle, dialog_down_cofirm;

    public RemoveChannelDialog(Context context) {
        super(context, R.style.customdialog_style);
        this.mContext = context;
    }

    public void setPositiveButtonListener(View.OnClickListener mClickListener) {
        if (mClickListener != null && dialog_down_cofirm != null) {
            dialog_down_cofirm.setOnClickListener(mClickListener);
        }
    }

    public void setDialogTitle(String title) {
        if (dialog_title != null) {
            dialog_title.setText(title);
        }
    }

    public void setPositiveButton(String text) {
        if (dialog_down_cofirm != null && mContext != null) {
            dialog_down_cofirm.setText(text);
        }
    }

    public void setPositiveButtonColor(int color) {
        if (dialog_down_cofirm != null && mContext != null) {
            dialog_down_cofirm.setTextColor(mContext.getResources().getColor(
                    color));
        }
    }

    public void show(String title) {
        show();
        if (dialog_title != null) {
            String html = "<p>确认要移除 <font color='#fb4747'>"+title+"</font> 吗？<p>";
            dialog_title.setText(Html.fromHtml(html));
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.dialog_custom_layout);
        dialog_title = (TextView) findViewById(R.id.dialog_delete_title);
        dialog_down_cancle = (TextView) findViewById(R.id.dialog_down_cancle);
        dialog_down_cofirm = (TextView) findViewById(R.id.dialog_down_cofirm);


        dialog_down_cancle.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                dismiss();
                cancel();
            }
        });
    }

}