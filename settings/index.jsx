function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Accent color settings</Text>}>
        <ColorSelect
          settingsKey="color"
          colors={[
            {color: "#f83c40"},
            {color: "#fc6b3a"},
            {color: "#ffd733"},
            {color: "#e4fa3c"},
            {color: "#f80070"},
            {color: "#f83478"},
            {color: "#a51e7c"},
            {color: "#d828b8"},
            {color: "#bd4efc"},
            {color: "#884cff"},
            {color: "#7898f8"},
            {color: "#7090b5"},
            {color: "#bcd8f8"},
            {color: "#2490dd"},
            {color: "#13d3f5"},
            {color: "#38f8df"},
            {color: "#00a629"},
            {color: "#67e55d"},
            {color: "#b8fc68"}
          ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Date settings</Text>}>
        <Toggle
          settingsKey="showDate"
          label={"Show Date"}
        />
        <Toggle
          settingsKey="showDay"
          label={"Show Day"}
        />
        <Toggle
          settingsKey="showMonth"
          label={"Show Month"}
        />        
      </Section>      
    </Page>
  );
}
registerSettingsPage(mySettings);
