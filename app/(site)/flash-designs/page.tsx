@@ .. @@
         <motion.div
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
           variants={containerVariants}
           initial="hidden"
           animate="visible"
         >
           {filteredDesigns.map((design) => (
             <motion.div
               key={design.id}
               className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-gray-50 border border-gray-200"
               variants={itemVariants}
               onClick={() => openModal(design.id)}
               whileHover={{ scale: 1.02 }}
               transition={{ duration: 0.2 }}
             >
@@ .. @@
              className="relative max-w-3xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 bg-white/90 p-2 rounded-full"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="relative h-[300px] md:h-full">
                  {selectedDesign && (
                    <Image
                      src={readyMadeDesigns.find(item => item.id === selectedDesign)?.image || ''}
                      alt={readyMadeDesigns.find(item => item.id === selectedDesign)?.title || ''}
                      className="w-full h-full object-cover"
                      width={600}
                      height={800}
                    />
                  )}
                </div>

                <div className="p-6 bg-gray-50">
                  {selectedDesign && (
                    <>
                      <h3 className="text-2xl font-bold mb-2">
                        {readyMadeDesigns.find(item => item.id === selectedDesign)?.title}
                      </h3>

                      <div className="flex items-center mb-4">
                        <span className="bg-gray-200 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {readyMadeDesigns.find(item => item.id === selectedDesign)?.category}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>