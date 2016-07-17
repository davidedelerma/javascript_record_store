var _ = require ( 'lodash');
var RecordStore = function(name, city, initialBalance){
  this.name = name;
  this.city = city;
  this.records = [];
  this.balance = initialBalance;
}

RecordStore.prototype ={
  addRecord: function(record){
    if(this.isARecord(record)){
      this.records.push(record)
    }else{
      return 
    }
  },

  isARecord: function(record){
    if(record.mediaType === "record"){ 
      return true
    }else{
      return false
    }
  },

  quantities: function(){
    var counts = {};
    _.forEach(this.records,function(record){
      var key = JSON.stringify(record)
      counts[key] = (counts[key]||0)+1; });
    return counts
  },


  listRecords: function(){
    counts = this.quantities()
    console.log(counts)
  },

  checkIfInRecords: function(record ){
    if(this.isARecord){
      return _.indexOf(this.records,record) >= 0
    }
  },

  removeRecordFromRecords: function(record){
    index=_.indexOf(this.records,record);
    _.pullAt(this.records, [index]);
  },

  sell: function(record){
    if (this.checkIfInRecords(record)){
      this.removeRecordFromRecords(record)
      this.balance+=record.price;
    }
  },

  inventoryValue: function(){
    recordPriceArray = _.map(this.records,function(record){return record.price});
    inventoryAmount = _.sum(recordPriceArray)
    return inventoryAmount
  },

  report: function(){
    console.log('The total amount of cash is: ' + this.balance + 'the total value of the inventory is: '+ this.inventory())
  }
}

module.exports = RecordStore;








