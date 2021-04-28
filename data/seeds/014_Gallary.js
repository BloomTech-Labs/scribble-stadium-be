const gallary = [
    {WritingUrl:"https://picsum.photos/id/1/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/201/400"},
    {WritingUrl:"https://picsum.photos/id/2/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/202/400"},
    {WritingUrl:"https://picsum.photos/id/3/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/203/400"},
    {WritingUrl:"https://picsum.photos/id/4/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/204/400"},
    {WritingUrl:"https://picsum.photos/id/5/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/205/400"},
    {WritingUrl:"https://picsum.photos/id/6/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/206/400"},
    {WritingUrl:"https://picsum.photos/id/7/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/207/400"}
]
  
  exports.seed = function (knex) {
    // Inserts seed entries
    return knex('Gallary').insert(gallary)
      
  };
  