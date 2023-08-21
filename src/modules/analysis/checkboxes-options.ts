const checkboxesOptions = [
   {
      name: "colors",
      label: "Select color",
      options: [
         { label: "Black", value: "black" },
         { label: "White", value: "white" },
      ],
   },
   {
      name: "variants",
      label: "Select variants",
      options: [
         { label: "UltraBullet", value: "ultraBullet" },
         { label: "Bullet", value: "bullet" },
         { label: "Blitz", value: "blitz" },
         { label: "Rapid", value: "rapid" },
         { label: "Classical", value: "classical" },
         { label: "Correspondence", value: "correspondence" },
      ],
   },
   {
      name: "gameTypes",
      label: "Select game type",
      options: [
         { label: "Rated", value: "rated" },
         { label: "Casual", value: "casual" },
      ],
   },
];

export default checkboxesOptions;
