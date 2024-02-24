import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
  query,
  orderByChild,
  equalTo,
  Query,
  DatabaseReference,
} from "firebase/database";
import { app } from "@/lib/firebase/firebase";
import { notifLang } from "@/lib/lang/notifLang";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Filter, TProduct } from "@/lib/typings/Typings";
import { defaultFilterBy } from "@/lib/static/defaultValues";

const useDatabase = () => {
  const { toast } = useToast();
  const [data, setData] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const saveData = async <Data extends object>(
    location: string,
    data: Data
  ) => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, location));
    const id = newDocRef.key;

    try {
      set(newDocRef, {
        ...data,
        id,
      });
      toast({
        ...notifLang.create.success,
      });
      return true;
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        ...notifLang.create.error,
      });
      return false;
    }
  };

  const getData = async (
    location: string,
    filterVal: Filter = defaultFilterBy
  ) => {
    const db = getDatabase(app);
    let dbRef: DatabaseReference | Query = ref(db, location);

    // * WILL ADD QUERIES IF filterVal HAS VALUES ( SEARCH & FILTER )
    if (filterVal.orderBy && filterVal.equalTo) {
      dbRef = query(
        ref(db, location),
        orderByChild(filterVal.orderBy),
        equalTo(filterVal.equalTo)
      );
    }

    try {
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setData(Object.values(snapshot.val()));
        } else {
          setData([]);
        }
        setLoading(false);
      });
    } catch {
      toast({
        variant: "destructive",
        ...notifLang.create.error,
      });
      setLoading(false);
    }
  };

  const deleteData = async (location: string) => {
    const db = getDatabase(app);
    const dbRef = ref(db, location);

    try {
      await remove(dbRef);
      toast({
        ...notifLang.delete.success,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        ...notifLang.delete.error,
      });
    }
  };

  const updateData = async <T extends object>(
    location: string,
    data: T
  ): Promise<boolean> => {
    const db = getDatabase(app);
    const dbRef = ref(db, location);

    try {
      await update(dbRef, data);
      toast({
        ...notifLang.update.success,
      });
      return true;
    } catch {
      toast({
        variant: "destructive",
        ...notifLang.update.error,
      });
      return false;
    }
  };

  return { saveData, data, getData, loading, deleteData, updateData };
};

export default useDatabase;
