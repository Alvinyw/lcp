<template>
  <div class="resultView">
    <section class="result-container">
      <img class="result-icon" src="../../assets/images/common_sucess.svg" alt />
      <p class="result-remark">{{ $route.query.result ? $route.query.result : "成功" }}</p>
      <p class="result-detail">{{ $route.query.detail }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Success"
};
</script>

<style lang="scss" scoped>
@import "../../styles/result_view.scss";
</style>
