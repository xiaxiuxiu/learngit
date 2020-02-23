<!--
 * @Author: your name
 * @Date: 2020-02-16 00:31:50
 * @LastEditTime: 2020-02-16 17:15:18
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \昆山公安局疫情防控数据录入系统\src\views\result\index.vue
 -->
<template>
  <div class="">
    <!-- 成果图片上传 -->
    <Upload />
    <!-- 高位统筹 -->
    <Highlevel />
    <!-- 党旗飘扬 -->
    <Flagfly />
    <!-- 涉疫打击 -->
    <Epidemicstrike />
    <!-- 战时表彰 -->
    <Wartime />
    <!-- 舆情训诫 -->
    <Yqing />
    <!-- 派出所打击 -->
    <Policestrike />
    <!-- 先进典型 -->
    <Advancedmodels />
    <!-- 战时正能量 -->
    <WartimePositiveEnergy />
  </div>
</template>

<script>
import Upload from "./upload/index";
import Highlevel from "./high-level/index";
import Flagfly from "./flag-fly/index";
import Epidemicstrike from "./epidemic-strike/index";
import Wartime from "./wartime/index";
import Yqing from "./yqing/index";
import Policestrike from "./polce-strike/index";
import Advancedmodels from "./advanced-models/index";
import WartimePositiveEnergy from "./wartime-Positive-Energy/index";
export default {
  components: {
    Upload,
    Highlevel,
    Flagfly,
    Epidemicstrike,
    Wartime,
    Yqing,
    Policestrike,
    Advancedmodels,
    WartimePositiveEnergy
  }
};
</script>

<style scoped lang="less"></style>
