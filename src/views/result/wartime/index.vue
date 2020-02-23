<template>
  <div>
    <EditComponent
      title="战时表彰"
      type="13"
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
          name: "辅警数",
          key: "fjs",
          unit: "人"
        },
        {
          name: "民警数",
          key: "mjs",
          unit: "人"
        }
      ]
    };
  }
};
</script>

<style></style>
