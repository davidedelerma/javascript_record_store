var Record = require ('../record');
var Customer = require('../customer')
var RecordStore = require ('../record_store')


var assert = require('chai').assert;

describe('record', function(){

  it('record has a title',function(){
    var record1 = new Record("guns","appetite",50)
    assert.equal("appetite",record1.title)
  })
})

describe('record_store', function(){

  beforeEach(function () {
    record_store1 = new RecordStore("Jhons","LA",100)
    record1 = new Record("guns","appetite",50)
    record2 = new Record("beatles","let it be",60)
    record4 = new Record("oasis","wanderwall",80)

  })

  it('record store has an initial balance',function(){
    assert.equal(100,record_store1.balance);
  })

  it('can add record to records',function(){
    record_store1.addRecord(record1);
    assert.equal(1,record_store1.records.length);
  }) 

  it('cant add something different from record to records',function(){    
    assert.equal(undefined,record_store1.addRecord(10));
  }) 

  it('count the number of copies of the same record', function(){
      record_store1.addRecord(record1)
      var record3 = new Record("guns","appetite",50)
      record_store1.addRecord(record3)
      record_store1.addRecord(record2)
      counts=record_store1.quantities()
      assert.equal(2,counts['{"mediaType":"record","artist":"guns","title":"appetite","price":50}'])
  })

  it('check if record exist',function(){
    record_store1.addRecord(record1)
    assert.equal(true,record_store1.checkIfInRecords(record1));
    assert.equal(false,record_store1.checkIfInRecords(record2));
  }) 

  it('store can sell record', function(){
    record_store1.addRecord(record1);
    record_store1.addRecord(record2);
    record_store1.addRecord(record4);
    record_store1.sell(record1);
    assert.equal(2,record_store1.records.length);
  })

  it('increase balance by price of record when record is sold', function(){
    record_store1.addRecord(record1);
    record_store1.addRecord(record2);
    record_store1.addRecord(record4);
    record_store1.sell(record1);
    assert.equal(150,record_store1.balance)
  })

  it('check the total value of the stock', function(){
    record_store1.addRecord(record1);
    record_store1.addRecord(record2);
    record_store1.addRecord(record4);    
    assert.equal(190,record_store1.inventoryValue())
  })
})

describe('customer',function(){

  beforeEach(function(){
    record_store1 = new RecordStore("Jhons","LA",100);
    record1 = new Record("guns","appetite",50);
    record2 = new Record("beatles","let it be",60);
    record4 = new Record("oasis","wanderwall",120);
    customer1 = new Customer("Davide","de Lerma", 100);
    customer2 = new Customer("Gennaro","Esposito", 0);
  })

  it('can afford record',function(){
    assert.equal(true,customer1.hasMoney(record1))
  })

  it('cant afford record',function(){
    assert.equal(false,customer1.hasMoney(record4))
  })

  it('subtract money from balance when buy a record',function(){
      customer1.buy(record1)
      assert.equal(50,customer1.balance)
  })

  it('add record to list of records when buy a record',function(){
    customer1.buy(record1)
    assert.equal(1,customer1.records.length)    
  })

  it('test if value of record is added to customer balance when sell ', function(){
    customer1.buy(record1)
    customer1.sell(record1);
    assert.equal(100,customer1.balance)
  })

  it('test if record is removed from records array when sell record',function(){
    customer1.buy(record1)
    customer1.sell(record1);
    assert.equal(0,customer1.records.length)
  })
})














