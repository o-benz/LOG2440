const { randomUUID } = require("crypto");

class PartnerManager {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    /**
     * Récupérer les partenaires du fichier JSON
     * @returns {Object[]} la liste des partenaires du fichier JSON
     */
    async getPartners() {
        const partnersData = await this.fileManager.readFile();
        return JSON.parse(partnersData);
    }

    /**
     * Récupérer un partenaire en fonction de son identifiant
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {Object| undefined} le partenaire, si existant
     */
    async getPartner(partnerId) {
        const partners = await this.getPartners();
        const foundPartner = partners.find(partner => partner.id === partnerId);
        return foundPartner;
    }

    /**
     * Ajouter un nouveau partenaire au fichier JSON
     * @param {Object} partner le partenaire à ajouter
     * @returns {Object[]} la liste des partenaires
     */
    async addPartner(partner) {
        partner.id = randomUUID();
        const partners = await this.getPartners();
        partners.push(partner);
        await this.fileManager.writeFile(JSON.stringify(partners, null, 2));
        return partners;
    }

    /**
     * Supprimer un partenaire du fichier JSON
     * @param {string} partnerId l'identifiant du partenaire
     * @returns {boolean} true si suppression, false sinon
     */
    async deletePartner(partnerId) {
        const partners = await this.getPartners();
        const partnerIndex = partners.findIndex(partner => partner.id === partnerId);

        if (partnerIndex !== -1) {
            partners.splice(partnerIndex, 1);
            await this.fileManager.writeFile(JSON.stringify(partners, null, 2));
            return true;
        } else {
            return false;
        }
    }
}

module.exports = { PartnerManager };
