import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "firebase/database";
import { app } from "@/lib/firebase/firebase";
import { notifLang } from "@/lib/lang/notifLang";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { TProduct } from "@/lib/typings/Typings";

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
      toast({
        variant: "destructive",
        ...notifLang.create.error,
      });
      return false;
    }
  };

  const getData = async (location: string) => {
    const db = getDatabase(app);
    const dbRef = ref(db, location);

    try {
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          setData(Object.values(snapshot.val()));
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
      console.log(err);
      toast({
        variant: "destructive",
        ...notifLang.delete.error,
      });
    }
  };

  return { saveData, data, getData, loading, deleteData };
};

export default useDatabase;