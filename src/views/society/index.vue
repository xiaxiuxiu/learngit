<template>
  <div class>
    <!-- 疫情重点地区在昆实有人员情况 -->
    <Keyareas />
    <!-- 汇聚涉疫重点数据情况 -->
    <Keydata />
    <!-- 人员分布地图和昆山排名 -->
    <Peoplemap />
    <!-- 苏州区县确诊排名 -->
    <Diagnosis />
  </div>
</template>

<script>
import Keyareas from "./key-areas/index";
import Keydata from "./key-data/index";
import Peoplemap from "./people-map/index";
import Diagnosis from "./diagnosis/index";
export default {
  components: {
    Keyareas,
    Keydata,
    Peoplemap,
    Diagnosis
  }
};
</script>

<style scoped lang="less"></style>
