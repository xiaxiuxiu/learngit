<template>
  <div>
    <EditComponent
      title="先进典型"
      type="16"
      :tab-data="tabData"
    ></EditComponent>
  </div>
</template>

<script>
import EditComponent from "@/components/edit-component";
export default {
  components: { EditComponent },
  data() {
    return {
      tabData: [
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
