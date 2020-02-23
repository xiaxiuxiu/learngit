<!--
 * @Author: wangzhongjie
 * @Date: 2019-10-22 13:52:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-19 16:30:41
 * @Description: 菜单
 * @Email: UvDream@163.com
 -->
<template>
  <Menu
    theme="light"
    :open-names="openKey"
    :accordion="true"
    :active-name="activeName"
    width="auto"
  >
    <MenuItem
      v-for="item in menusList"
      :key="item.id + 'sh'"
      :name="item.id"
      :to="item.url"
      v-show="!item.children"
    >
      <div>
        <!-- <span class="iconfont" :class="item.icon" style="font-size:30px;"></span> -->
        <div>
          <Icon type="md-book" />
          {{ item.name }}
        </div>
      </div>
    </MenuItem>
    <Submenu
      v-for="(item, index) in menusList"
      :key="index"
      :name="item.id"
      v-show="item.children"
    >
      <template slot="title">
        <!-- <span class="iconfont" :class="item.icon" style="font-size:30px;"></span> -->
        <div>
          <Icon type="md-book" />
          {{ item.name }}
        </div>
      </template>
      <MenuItem
        v-for="(items, index) in item.children"
        :key="index"
        :name="items.id"
        :to="items.url"
      >
        <Icon type="md-book" />
        {{ items.name }}
      </MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
export default {
  data() {
    return {
      openKey: ["1"],
      activeName: "3"
    };
  },
  props: {
    menusList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    isCollapsed: function() {
      return this.$store.state.isCollapsed;
    }
  },
  watch: {
    $route: function(val) {
      this.activeName = this.activeFunc(this.$route.path);
    }
  },
  mounted() {
    this.activeName = this.activeFunc(this.$route.path);
  },
  methods: {
    activeFunc(path) {
      let num;
      this.menusList.forEach(element => {
        element.url == path ? (num = element.id) : "";
        element.children
          ? element.children.forEach(item => {
              item.url === path ? (num = item.id) : "";
            })
          : "";
      });
      return num;
    }
  }
};
</script>

<style lang="less">
.ivu-menu-item {
  text-align: center;
  font-size: 14px;
  min-height: 60px;
  line-height: 60px;
  padding: 0 !important;
}
// 一级菜单
.ivu-menu-submenu-title {
  height: 40px !important;
  text-align: center;
  padding: 0 !important;
}
.ivu-menu-submenu-title-icon {
  display: none !important;
}
</style>
