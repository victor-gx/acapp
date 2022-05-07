class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";
        this.start();
    }
    start() {
        this.getinfo();
    }
    register() {    //打开注册界面
    }
    login() {       //打开登录界面
    }
    getinfo() {
        let outer = this;
        $.ajax({
            url: "https://app2287.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {    //登录成功，关闭登录界面，打开主菜单
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }
    hide() {
    }
    show() {
    }
}

