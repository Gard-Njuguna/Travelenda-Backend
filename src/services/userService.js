const admin = require('../config/firebase');

class UserService {
  constructor() {
    this.db = admin.firestore();
  }

  // Create or update user profile
  async createOrUpdateUser(uid, userData) {
    try {
      const userRef = this.db.collection('users').doc(uid);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        // Update existing user
        await userRef.update({
          ...userData,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        // Create new user
        await userRef.set({
          ...userData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }
      
      return { success: true, message: 'User profile updated successfully' };
    } catch (error) {
      console.error('Error creating/updating user:', error);
      throw new Error('Failed to update user profile');
    }
  }

  // Get user profile
  async getUserProfile(uid) {
    try {
      const userRef = this.db.collection('users').doc(uid);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) {
        throw new Error('User not found');
      }
      
      return { success: true, data: userDoc.data() };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw new Error('Failed to get user profile');
    }
  }

  // Save a trip
  async saveTrip(uid, tripData) {
    try {
      const tripRef = this.db.collection('users').doc(uid).collection('trips').doc();
      await tripRef.set({
        ...tripData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, tripId: tripRef.id, message: 'Trip saved successfully' };
    } catch (error) {
      console.error('Error saving trip:', error);
      throw new Error('Failed to save trip');
    }
  }

  // Get user trips
  async getUserTrips(uid) {
    try {
      const tripsRef = this.db.collection('users').doc(uid).collection('trips');
      const snapshot = await tripsRef.orderBy('createdAt', 'desc').get();
      
      const trips = [];
      snapshot.forEach(doc => {
        trips.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return { success: true, data: trips };
    } catch (error) {
      console.error('Error getting user trips:', error);
      throw new Error('Failed to get user trips');
    }
  }

  // Update trip
  async updateTrip(uid, tripId, updateData) {
    try {
      const tripRef = this.db.collection('users').doc(uid).collection('trips').doc(tripId);
      await tripRef.update({
        ...updateData,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, message: 'Trip updated successfully' };
    } catch (error) {
      console.error('Error updating trip:', error);
      throw new Error('Failed to update trip');
    }
  }

  // Delete trip
  async deleteTrip(uid, tripId) {
    try {
      await this.db.collection('users').doc(uid).collection('trips').doc(tripId).delete();
      return { success: true, message: 'Trip deleted successfully' };
    } catch (error) {
      console.error('Error deleting trip:', error);
      throw new Error('Failed to delete trip');
    }
  }

  // Save an item (hotel, destination, etc.)
  async saveItem(uid, itemData) {
    try {
      const itemRef = this.db.collection('users').doc(uid).collection('savedItems').doc();
      await itemRef.set({
        ...itemData,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, itemId: itemRef.id, message: 'Item saved successfully' };
    } catch (error) {
      console.error('Error saving item:', error);
      throw new Error('Failed to save item');
    }
  }

  // Get saved items
  async getSavedItems(uid) {
    try {
      const itemsRef = this.db.collection('users').doc(uid).collection('savedItems');
      const snapshot = await itemsRef.orderBy('createdAt', 'desc').get();
      
      const items = [];
      snapshot.forEach(doc => {
        items.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return { success: true, data: items };
    } catch (error) {
      console.error('Error getting saved items:', error);
      throw new Error('Failed to get saved items');
    }
  }

  // Remove saved item
  async removeSavedItem(uid, itemId) {
    try {
      await this.db.collection('users').doc(uid).collection('savedItems').doc(itemId).delete();
      return { success: true, message: 'Item removed successfully' };
    } catch (error) {
      console.error('Error removing saved item:', error);
      throw new Error('Failed to remove saved item');
    }
  }

  // Update user preferences
  async updatePreferences(uid, preferences) {
    try {
      const userRef = this.db.collection('users').doc(uid);
      await userRef.update({
        preferences: preferences,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, message: 'Preferences updated successfully' };
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw new Error('Failed to update preferences');
    }
  }
}

module.exports = new UserService();
