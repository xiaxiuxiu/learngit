<!--
 * @Author: wangzhongjie
 * @Date: 2019-10-22 11:53:46
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-19 16:27:41
 * @Description: 主界面
 * @Email: UvDream@163.com
 -->
<template>
  <div class="layout">
    <Layout style="height:100vh">
      <Header>
        <Logo />
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{
            background: '#fff',
            boxShadow: '10px 0 24px 0 rgba(14,37,38,0.10)'
          }"
        >
          <Menus :menus-list="menusList" />
        </Sider>
        <Layout>
          <!-- <Header
            :style="{
              background: '#ebf1f2',
              height: '62px',
              padding: '0px 20px'
            }"
          >
            <div class="header">
              <div class="header-bread">
                <span>{{ $route.meta.label }}</span>
              </div>
            </div>
          </Header> -->
          <Content
            :style="{
              padding: '0px 24px',
              minHeight: '280px',
              background: '#ebf1f2',
              minWidth: '950px'
            }"
          >
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Logo from "../components/logo/logo.vue";
import Menus from "../components/menus/menus";
export default {
  components: {
    Logo,
    Menus
  },
  data() {
    return {
      menusList: [
        {
          name: "社会防控",
          id: "1",
          url: "/society"
        },
        // {
        //   name: "小菜单",
        //   id: "1",
        //   url: "/society",
        //   children: [
        //     { name: "待办档案", id: "1-2", url: "/fileNoreadyManagement" },
        //     { name: "已办档案", id: "1-3", url: "/fileAlreadyManagement" },
        //     { name: "通知管理", id: "1-4", url: "/notificationManagement" }
        //   ]
        // },
        {
          name: "公安防控",
          id: "2",
          url: "/police"
        },
        {
          name: "防控成果",
          id: "3",
          url: "/result"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  watch: {
    $route(val) {}
  },
  computed: {
    isCollapsed: function() {
      return this.$store.state.isCollapsed;
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
.header {
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-bread {
    line-height: 20px;
    & > span {
      font-size: 20px;
      color: #333;
    }
  }
}
</style>
<style type="text/css">
.ivu-menu-submenu-title > i,
.ivu-menu-submenu-title span > i {
  margin-right: 0;
}
</style>
