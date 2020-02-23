<!--
 * @Author: wangzhongjie
 * @Date: 2019-10-22 11:35:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-01 10:49:53
 * @Description: 登陆注册界面
 * @Email: UvDream@163.com
 -->
<template>
  <div class="login">
    <div>
      <video autoplay muted loop="loop">
        <source src="../../assets/fonts/login/after.mp4" type="video/mp4" />
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="login-block">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div>
          <h2>昆山公安局疫情防控数据录入系统</h2>
        </div>
        <div>
          <FormItem prop="user">
            <Input
              prefix="ios-person-outline"
              placeholder="账户"
              type="text"
              v-model="formInline.user"
              style="width: 380px;"
            />
          </FormItem>
        </div>
        <div>
          <FormItem prop="password">
            <Input
              prefix="ios-lock-outline"
              placeholder="密码"
              type="password"
              v-model="formInline.password"
              style="width: 380px;"
            />
          </FormItem>
        </div>
        <!-- <div style="margin-left: -290px;">
          <FormItem>
            <Checkbox v-model="single" style="color:#fff;">记住密码</Checkbox>
          </FormItem>
        </div>-->
        <div>
          <FormItem>
            <Button
              type="primary"
              @click="handleSubmit()"
              style="width: 380px;"
            >
              登录
            </Button>
          </FormItem>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login/index";
// import store from '@/store'
export default {
  data() {
    return {
      single: true,
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入账户",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不够",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    //测试用
    sessionStorage.setItem("username", "小红帽");
  },
  methods: {
    handleSubmit() {
      let data = {
        name: this.formInline.user,
        pwd: this.formInline.password
      };
      const _this = this;
      login(data).then(res => {
        if (res.code === 10000) {
          //登录成功
          sessionStorage.setItem("username", _this.formInline.user);
          this.$router.push({ path: "/society" });
        } else {
          this.$Message.error("登陆失败!");
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
video {
  position: fixed;
  right: 0px;
  bottom: 0px;
  width: 100% !important;
  z-index: -999;
}
.login {
  position: relative;
  height: 100vh;
  width: 100%;
  background: black;
  z-index: -1000;
}
.login {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &-block {
    background: url("../../assets/fonts/login/form-bg.png") no-repeat center;
    position: absolute;
    top: 16%; //290px
    width: 557px;
    height: 565px;
    display: flex;
    justify-content: space-between;
    & > form {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & > div {
        & > h1 {
          font-size: 28px;
          color: #fff;
          font-weight: normal;
          text-align: center;
        }
        & > h2 {
          font-size: 24px;
          color: #75e1e4;
          font-weight: normal;
          text-align: center;
          margin-bottom: 10px;
        }
        & > h3 {
          font-size: 12px;
          color: #5e708f;
          font-weight: normal;
          text-align: center;
        }
        .ivu-btn {
          border-radius: 20px;
          height: 49px;
        }
      }
      & > div:nth-child(1) {
        margin-bottom: 44px;
      }

      .form-block {
        height: 42px;
      }
    }
  }
}
</style>
<style type="text/css">
.login .ivu-input-wrapper .ivu-input {
  height: 42px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  background: rgba(26, 57, 86, 0.3);
  border: 1px solid #75e1e4;
}
.login .ivu-btn-primary.ivu-btn {
  height: 42px;
  border-radius: 20px;
  color: #fff;
  font-size: 20px;
  background: rgba(117, 225, 228, 0.3);
  border: 2px solid #75e1e4;
  letter-spacing: 10px;
}
.login .ivu-input-wrapper .ivu-input-prefix,
.login .ivu-input-wrapper .ivu-input-suffix {
  height: 42px;
  top: 4px;
}
.login .ivu-icon-ios-lock-outline {
  background: url("../../assets/fonts/login/pas.png") no-repeat right;
}
.login .ivu-icon-ios-lock-outline:before,
.login .ivu-icon-ios-person-outline:before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 20px;
}
.login .ivu-icon-ios-person-outline {
  background: url("../../assets/fonts/login/user.png") no-repeat right;
}
.login .ivu-input-with-prefix {
  padding-left: 44px;
}
</style>
