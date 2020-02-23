<template>
  <div>
    <EditComponent
      title="舆情训诫"
      type="14"
      :tab-data="tabData"
    ></EditComponent>
  </div>
</template>

<script>
import EditComponent from "@/components/edit-component/add-edit.vue";
export default {
  components: { EditComponent },
  data() {
    return {
      tabData: [
        {
          name: "日期",
          key: "date",
          isDate: true
        },
        {
          name: "排序",
          key: "sort"
        },
        {
          name: "是否展示",
          key: "show",
          isSelector: true
        },
        {
          name: "内容详情",
          key: "detail",
          inputType: "textarea"
        }
      ]
    };
  }
};
</script>

<style></style>
