import counterDummy from "../__mocks__/mockCounter";
import { commentsCounter, mealsCounter } from '../counter'

describe('Count items', () =>{
  const arr = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
  const emptyarr = [];
  it('number of items', () =>{
    expect(counterDummy(arr)).toBe(6);
  });
  it('no items', () => {
    expect(counterDummy(emptyarr)).toBe(0);
  })
});

describe('Count comments', () =>{
  const arr = ['comment 1', 'comment 2', 'comment 3', 'comment 4', 'comment 5', 'comment 6'];
  const emptyarr = [];
  it('number of comments', () =>{
    expect(commentsCounter(arr)).toBe(6);
  });
  it('no comments', () => {
    expect(commentsCounter(emptyarr)).toBe(0);
  }) 
});

// describe('Count meals', () =>{
//   const arr = ['meal 1', 'meal 2', 'meal 3', 'meal 4', 'meal 5', 'meal 6'];
//   const category = 'Beef';
//   const emptyarr = [];
//   const menuTarget = `<li class="nav-item">
//   <a id="Beef" class="nav-link" aria-current="page" href="#"
//     >Beef</a
//   >
// </li>`
// console.log(menuTarget)
//   it('number of comments', () =>{
//     expect(mealsCounter(arr, category, menuTarget)).toBe(true);
//   });
//   // it('no comments', () => {
//   //   expect(commentsCounter(emptyarr)).toBe(0);
//   // }) 
// });
