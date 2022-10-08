<template>
<div style="width: 400px;">
  <div style="display: flex; flex-direction: row; justify-content: space-between;">
    <YuumiTooltip content="top start tooltip message" placement="top-start">
      <YuumiButton style="width: 120px;">top start</YuumiButton>
    </YuumiTooltip>

    <YuumiTooltip content="top center tooltip message" placement="top">
      <YuumiButton style="width: 120px;">top</YuumiButton>
    </YuumiTooltip>

    <YuumiTooltip content="top end tooltip message" placement="top-end">
      <YuumiButton style="width: 120px;">top end</YuumiButton>
    </YuumiTooltip>
  </div>

  <div style="overflow: hidden;">
    <div style="float:left; display: flex; flex-direction: column;">
      <YuumiTooltip content="left start tooltip message" placement="left-start">
        <YuumiButton style="margin-top: 10px; width: 120px;">left start</YuumiButton>
      </YuumiTooltip>

      <YuumiTooltip content="left center tooltip message" placement="left">
        <YuumiButton style="margin-top: 10px; width: 120px;">left</YuumiButton>
      </YuumiTooltip>

      <YuumiTooltip content="left end tooltip message" placement="left-end">
        <YuumiButton style="margin-top: 10px; width: 120px;">left end</YuumiButton>
      </YuumiTooltip>
    </div>

    <div style="float:right;display: flex; flex-direction: column;">
      <YuumiTooltip content="right start tooltip message" placement="right-start">
        <YuumiButton style="margin-top: 10px; width: 120px;">right start</YuumiButton>
      </YuumiTooltip>

      <YuumiTooltip content="right center tooltip message" placement="right">
        <YuumiButton style="margin-top: 10px; width: 120px;">right</YuumiButton>
      </YuumiTooltip>

      <YuumiTooltip content="right end tooltip message" placement="right-end">
        <YuumiButton style="margin-top: 10px; width: 120px;">right end</YuumiButton>
      </YuumiTooltip>
    </div>
  </div>

  <div style="display: flex; flex-direction: row; justify-content: space-between; margin-top: 10px;">
    <YuumiTooltip content="bottom start tooltip message" placement="bottom-start">
      <YuumiButton style="width: 120px;">bottom start</YuumiButton>
    </YuumiTooltip>

    <YuumiTooltip content="bottom center tooltip message" placement="bottom">
      <YuumiButton style="width: 120px;">bottom</YuumiButton>
    </YuumiTooltip>

    <YuumiTooltip content="bottom end tooltip message" placement="bottom-end">
      <YuumiButton style="width: 120px;">bottom end</YuumiButton>
    </YuumiTooltip>
  </div>
</div>
</template>