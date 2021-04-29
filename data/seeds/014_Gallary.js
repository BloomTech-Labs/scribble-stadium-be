const gallary = [
    {WritingUrl:"https://picsum.photos/id/1/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/201/400", children_id: 2},
    {WritingUrl:"https://picsum.photos/id/2/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/202/400", children_id: 2},
    {WritingUrl:"https://picsum.photos/id/3/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/203/400", children_id: 2},
    {WritingUrl:"https://picsum.photos/id/4/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/204/400", children_id: 6},
    {WritingUrl:"https://picsum.photos/id/5/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/205/400", children_id: 6},
    {WritingUrl:"https://picsum.photos/id/6/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/206/400", children_id: 6},
    {WritingUrl:"https://picsum.photos/id/7/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/207/400", children_id: 6},
    {WritingUrl:"https://picsum.photos/id/8/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/208/400", children_id: 10},
    {WritingUrl:"https://picsum.photos/id/9/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/209/400", children_id: 10},
    {WritingUrl:"https://picsum.photos/id/10/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/210/400", children_id: 10},
    {WritingUrl:"https://picsum.photos/id/11/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/211/400", children_id: 14},
    {WritingUrl:"https://picsum.photos/id/12/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/212/400", children_id: 14},
    {WritingUrl:"https://picsum.photos/id/13/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/213/400", children_id: 14},
    {WritingUrl:"https://picsum.photos/id/14/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/214/400", children_id: 22},
    {WritingUrl:"https://picsum.photos/id/15/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/215/400", children_id: 22},
    {WritingUrl:"https://picsum.photos/id/16/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/216/400", children_id: 22},
    {WritingUrl:"https://picsum.photos/id/17/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/217/400", children_id: 26},
    {WritingUrl:"https://picsum.photos/id/18/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/218/400", children_id: 26},
    {WritingUrl:"https://picsum.photos/id/19/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/219/400", children_id: 26},
    {WritingUrl:"https://picsum.photos/id/20/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/220/400", children_id: 30},
    {WritingUrl:"https://picsum.photos/id/21/400", PageNum:1, DrawingUrl:"https://picsum.photos/id/221/400", children_id: 30}
]
  
  exports.seed = function (knex) {
    // Inserts seed entries
    return knex('Gallary').insert(gallary)
      
  };
  