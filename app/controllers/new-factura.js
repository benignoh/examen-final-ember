import Controller from '@ember/controller';
import Ember from 'ember';
import sweetAlert from 'ember-sweetalert';

export default Controller.extend({
  store: Ember.inject.service('store'),
  actions: {
    guardar() {
      let sweetalert = this.get('sweetAlert');
      let factura = this.get('model');
      factura.save().then(() => {
        Ember.RSVP.all(factura.get('conceptos').invoke('save')).then(() => {
            sweetAlert({
              title: 'Guardado',
              type: 'success',
              text: 'Se ha guardado la factura',
              timer: 1500
            });
            this.transitionToRoute('lista-facturas');
        })
      })
    },
    nuevoConcepto() {
      let concepto = this.store.createRecord('concepto', {
        factura: this.get('model')
      });
    }
  }
});
