var _ = require ( 'lodash');

var Customer = function(name,surname,balance){
  this.name = name;
  this.surname = surname;
  this.balance = balance;
  this.records = [];
}

Customer.prototype={
  hasMoney: function(record){
    return (this.balance-record.price>=0)
  },

  buy: function(record){
    if(record.mediaType === "record"){
      if(this.hasMoney){
        this.balance-=record.price
        this.records.push(record)
      }
    }
  },

  addMoneyToBalance: function(record){
    this.balance+=record.price
  },

  removeRecordFromRecords: function(record){
    index=_.indexOf(this.records,record);
    _.pullAt(this.records, [index]);
  },

  recordIsInRecords: function(record){
    return (_.indexOf(this.records,record)>=0)
  },

  sell: function(record){
    if(record.mediaType === "record"){
      if (this.recordIsInRecords(record)){
        this.addMoneyToBalance(record);
        this.removeRecordFromRecords(record);
      }
    }  
  }

}

module.exports = Customer;