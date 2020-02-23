<template>
  <div>
    <EditComponent
      title="派出所打击"
      type="15"
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
