/*
 * memner application code,
 * loaded and called just before page rendering
 */
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
        context.page_title = 'חבר הכנסת ' + context.name;
      else
        context.page_title = 'חברי הכנסת';
    }
  }
}
