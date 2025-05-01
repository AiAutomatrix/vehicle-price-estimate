// src/scripts/formDataStore.js

/**
 * Save form data by sending it to Botpress as an event.
 * This assumes your hook handles session management and event sending.
 * @param {Object} formData - Collected form values
 * @param {Function} sendEvent - Function from useBotpressForm to dispatch event
 * @returns {Promise<Object>} Event response from Botpress
 */
export const saveFormData = async (formData, sendEvent) => {
    if (!sendEvent) throw new Error('sendEvent function is required')
  
    try {
      console.log('📝 Saving form data:', formData)
      const response = await sendEvent('form_submission', {
        form: formData
      })
      console.log('✅ Form data saved via Botpress:', response)
      return response
    } catch (err) {
      console.error('❌ Failed to save form data:', err)
      throw err
    }
  }
  