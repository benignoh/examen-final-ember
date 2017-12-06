import DS from 'ember-data';
import Ember from 'ember';
export default DS.Model.extend({
    fecha: DS.attr("date"),
    folio: DS.attr("number"),
    serie: DS.attr("string"),
    formaPago: DS.attr("number"),
    conceptos: DS.hasMany("concepto"),

    subtotal: Ember.computed('conceptos.@each.precio', function(){
        var total = 0;
        this.get('conceptos').forEach(function(concepto) {
          total += Number(concepto.get('precio')*concepto.get('cantidad'));
        });
        return total;
      }),
      
        total: Ember.computed('conceptos.@each.precio', function(){
          var total = 0;
          this.get('conceptos').forEach(function(concepto) {
            total += Number((concepto.get('precio')*concepto.get('cantidad'))-concepto.get('descuento'));
          });
          return total;
        }),

    
});
