class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            Log in
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="username">
            </div>
        </div>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="password">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>Log in</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            register
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width="30" src="https://app2287.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                AcWing Log In
            </div>
        </div>
    </div>
    <div class="ac-game-settings-register">
        <div class="ac-game-settings-title">
            register
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="username">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-first">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="password">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-second">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="confirm password">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>register</button>
            </div>
        </div>
        <div calss="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            Log in
        </div>
        <br>
        <div class="ac-game-settings-acwing">
            <img width="30" src="https://app2287.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
            <br>
            <div>
                AcWing Log In
            </div>
        </div>
    </div>
</div>
`);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }

    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();
    }

    add_listening_events_login() {
        let outer = this;

        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {  //在远程服务器上登陆
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://app2287.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {    //登录成功，关闭登录界面，打开主菜单
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://app2287.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload(); // 刷新页面
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {
        if (this.platform === "ACAPP") return false;

        $.ajax({
            url: "https://app2287.acapp.acwing.com.cn/settings/logout/",
            type: "GET",
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload(); // 刷新页面
                }
            }
        });
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login() {
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {
        let outer = this;

        $.ajax({
            url: "https://app2287.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                plaform: outer.platform,
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
        this.$settings.hide();
    }

    show() {
        this.$Settings.show();
    }
}

