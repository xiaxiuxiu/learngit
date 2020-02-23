<!--
 * @Author: wangzhongjie
 * @Date: 2019-10-22 13:52:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-05 18:00:58
 * @Description: logo
 * @Email: UvDream@163.com
 -->
<template>
  <div class="logo">
    <span class="logo-max">昆山公安局疫情防控数据录入系统</span>
    <div class="logo-user">
      <div class="logo-user-left">
        <span style="margin-left: 20px ">
          您好,
          <span style="color:#53A7A9">{{ username }}</span>
        </span>
      </div>
      <div class="logo-user-right" @click="logout()">
        <img src="../../assets/fonts/closed.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    username: function() {
      return sessionStorage.getItem("username") || this.$store.state.username;
    }
  },
  methods: {
    logout() {
      this.$router.push({ path: "/login" });
      sessionStorage.clear();
      history.go(0);
    }
  }
};
</script>

<style scoped lang="less">
.logo {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > img {
    width: 50px;
    position: relative;
    top: -5px;
  }
  &-max {
    font-size: 24px;
    margin-left: 10px;
  }
  &-user {
    height: 50px;
    display: flex;
    align-items: center;
    &-left {
      display: flex;
      width: 180px;
      height: 50px;
      align-items: center;
      justify-content: flex-end;
      & > img {
        width: 50px;
        height: 50px;
      }
    }
    &-right {
      height: 50px;
      line-height: 50px;
      & > img {
        width: 50px;
        height: 50px;
      }
    }
  }
}
</style>
