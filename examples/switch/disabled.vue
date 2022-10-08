<template>
  <div>
    <YuumiSwitch style="margin: 0 10px 10px 0;" disabled></YuumiSwitch>
    <YuumiSwitch style="margin: 0 10px 10px 0;" open-color="green" close-color="red" disabled>
      <template v-slot:open> 开</template>
      <template v-slot:close>关 </template>
    </YuumiSwitch>
  </div>
</template>