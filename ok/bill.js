module.exports = function(app){
  return {
    /**
     * An update function called just before rending to update
     * context with app specific data
     * @param action - the thing to do
     * @param id - the subject to act upon
     * @param context - the object use for rendering
     */
    update: function (action, id, context) {
      if (id)
        if (context.state == 'אושרה')
          context.page_title =  'חוק: ' + context.title;
        else
          context.page_title =  'הצעת חוק: ' + context.title;
      else
        context.page_title = 'חוקים והצעות חוק';
    }
  }
}
