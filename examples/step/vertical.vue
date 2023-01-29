<template>
<div style="height: 300px; display: inline-block; margin-right: 50px;">
  <YuumiStep :active="1" direction="vertical">
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</div>

<div style="height: 300px; display: inline-block;">
  <YuumiStep :active="2" direction="vertical" mini>
    <YuumiStepItem title="step 1">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 2">这里描述信息</YuumiStepItem>
    <YuumiStepItem title="step 3">这里描述信息</YuumiStepItem>
  </YuumiStep>
</div>
</template>
