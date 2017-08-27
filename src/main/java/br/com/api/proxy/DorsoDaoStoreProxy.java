package br.com.api.proxy;

import java.util.List;
import javax.persistence.EntityManager;
import br.com.api.dao.DorsoDao;
import br.com.api.model.Dorso;
import br.com.api.store.DorsoStore;

public class DorsoDaoStoreProxy extends DorsoDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<Dorso> searchAll(EntityManager em, Class<?> classType) {
		
		if(DorsoStore.dorsoStore.isEmpty()){
			DorsoStore.dorsoStore = (List<Dorso>) super.searchAll(em, classType);
		}
		return DorsoStore.dorsoStore;
	}

}
