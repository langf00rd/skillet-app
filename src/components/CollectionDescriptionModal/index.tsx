import * as React from "react";
import * as Showdown from "showdown";
import { Collection } from "../../interfaces";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CollectionDescriptionModal(props: {
  show: boolean;
  onHide: () => void;
  collection: Collection | undefined;
}) {
  const converter = new Showdown.Converter();
  const html = converter.makeHtml(props.collection?.description || "");

  if (!props.show) return <></>;
  return (
    <div className="px-5 w-screen h-screen flex items-center justify-center bg-[#000000d1] z-10 fixed top-0 left-0">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 shadow-3xl p-5 px-7 rounded-xl max-w-[500px] grid gap-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-[700]">
            {props.collection?.name}
          </h2>
          <FiX
            onClick={props.onHide}
            size={25}
            className="cursor-pointer hover:text-primary transition-all"
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {/* Render markdown description as valid HTML */}
      </motion.div>
    </div>
  );
}
